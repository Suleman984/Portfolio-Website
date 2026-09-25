'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion, scrollState } from '@/lib/scroll';

const COLS = 150;
const ROWS = 90;
const WIDTH = 40;
const DEPTH = 26;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  varying float vFade;

  void main() {
    vec3 p = position;
    float wave = sin(p.x * .28 + uTime * .35) * .45
               + cos(p.z * .42 - uTime * .28) * .3
               + sin((p.x + p.z) * .18 + uTime * .2) * .25;
    float d = distance(p.xz, uMouse);
    float ripple = sin(d * 1.6 - uTime * 2.4) * exp(-d * .38) * .9;
    p.y += (wave + ripple) * uAmp;

    vec4 mv = modelViewMatrix * vec4(p, 1.);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (10. / -mv.z);
    // Fade toward the horizon and the near edge so the mat has no hard border.
    vFade = smoothstep(-${(DEPTH / 2).toFixed(1)}, -4., p.z) * (1. - smoothstep(6., ${(DEPTH / 2).toFixed(1)}, p.z));
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vFade;

  void main() {
    float r = length(gl_PointCoord - .5);
    if (r > .5) discard;
    gl_FragColor = vec4(uColor, uAlpha * vFade * smoothstep(.5, .2, r));
  }
`;

/** A dotted cutting mat under the paper: slow swell, a ripple under the cursor, and a surge on fast scrolls. */
export default function DeskCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return; // No WebGL — the CSS desk colour stands on its own.
    }
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 7, 13);
    camera.lookAt(0, 0, -1);

    const positions = new Float32Array(COLS * ROWS * 3);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = (r * COLS + c) * 3;
        positions[i] = (c / (COLS - 1) - 0.5) * WIDTH;
        positions[i + 2] = (r / (ROWS - 1) - 0.5) * DEPTH;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 1 },
      uSize: { value: 2.6 },
      uPixelRatio: { value: dpr },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uColor: { value: new THREE.Color() },
      uAlpha: { value: 0.5 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geometry, material));

    // Dot colour follows the theme tokens, including live light/dark switches.
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const readColor = () => {
      const css = getComputedStyle(document.documentElement);
      uniforms.uColor.value.set(css.getPropertyValue('--dot').trim() || '#1b1a17');
      uniforms.uAlpha.value = parseFloat(css.getPropertyValue('--dot-alpha')) || 0.5;
    };
    readColor();

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    // Pointer → point on the mat (y = 0 plane).
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const mouseTarget = new THREE.Vector2(99, 99);
    const onPointer = (e: PointerEvent) => {
      ndc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) mouseTarget.set(hit.x, hit.z);
    };

    const reduced = prefersReducedMotion();
    const clock = new THREE.Clock();
    let raf = 0;
    let surge = 0;

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt;
      // Scroll speed swells the mat, then it settles back.
      surge += (Math.min(Math.abs(scrollState.velocity) / 40, 1.2) - surge) * 0.06;
      uniforms.uAmp.value = 0.85 + surge;
      uniforms.uMouse.value.lerp(mouseTarget, 0.08);
      // The camera drifts down the desk as you read down the page.
      camera.position.y = 7 - scrollState.progress * 2.2;
      camera.lookAt(0, 0, -1 + scrollState.progress * 2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced) return;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onScheme = () => {
      readColor();
      if (reduced) renderer.render(scene, camera);
    };
    const onResize = () => {
      resize();
      if (reduced) renderer.render(scene, camera);
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      canvas.style.display = 'none';
    };

    if (reduced) renderer.render(scene, camera);
    else start();

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    scheme.addEventListener('change', onScheme);
    canvas.addEventListener('webglcontextlost', onContextLost);
    requestAnimationFrame(() => canvas.classList.add('is-ready'));

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      scheme.removeEventListener('change', onScheme);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} className="desk-canvas" aria-hidden="true" />;
}
