'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, prefersReducedMotion, ScrollTrigger, scrollState, scrollToHash, setLenis } from '@/lib/scroll';

/** Lenis on GSAP's ticker, so ScrollTrigger and the scroll position never disagree by a frame. */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let onScroll: (() => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
      setLenis(lenis);
      lenis.on('scroll', (l: Lenis) => {
        scrollState.velocity = l.velocity;
        scrollState.progress = l.progress;
        ScrollTrigger.update();
      });
      tick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } else {
      onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = max > 0 ? window.scrollY / max : 0;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      const href = a?.getAttribute('href');
      if (!href || href === '#' || !document.querySelector(href)) return;
      e.preventDefault();
      scrollToHash(href);
      window.history.pushState(null, '', href);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      if (onScroll) window.removeEventListener('scroll', onScroll);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
