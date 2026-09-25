'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Mutable scroll state shared with the WebGL loop. Written on every Lenis
 * tick and read inside requestAnimationFrame — never through React state,
 * so scrolling never re-renders anything.
 */
export const scrollState = { velocity: 0, progress: 0 };

let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Header height the anchors land under. Mirrors `--bar-h` in globals.css. */
export const ANCHOR_OFFSET = -76;

export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!(target instanceof HTMLElement)) return;
  if (lenis) lenis.scrollTo(target, { offset: ANCHOR_OFFSET, duration: 1.4 });
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export { gsap, ScrollTrigger, SplitText };
