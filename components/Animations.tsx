'use client';

import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion, ScrollTrigger, SplitText } from '@/lib/scroll';

/**
 * All page choreography, driven by data attributes on server-rendered markup:
 *
 *   data-intro="bar|sheet|name|line"  the load sequence
 *   data-split                         section titles, typed in by character
 *   data-rule                          rules drawn left → right
 *   data-reveal                        blocks that rise in, batched per frame
 *   data-hl                            highlighter swept across a phrase
 *   data-count                         numbers counted up from zero
 *   data-track                         the experience line, scrubbed to scroll
 *
 * Every element's final state is its CSS state, so the page reads fully
 * without JavaScript; this only ever sets from-states.
 */
export default function Animations() {
  useGSAP(() => {
    const root = document.documentElement;
    const release = () => root.classList.remove('intro');

    if (prefersReducedMotion()) {
      release();
      return;
    }

    const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

    // ── From-states, set while the intro class still hides page one ──
    const name = new SplitText('[data-intro="name"]', { type: 'words,chars', mask: 'chars' });
    const titles = q('[data-split]').map((el) => new SplitText(el, { type: 'words,chars' }));
    gsap.set(name.chars, { yPercent: 110 });
    gsap.set('[data-intro="line"]', { y: 14, autoAlpha: 0 });
    gsap.set('[data-reveal]', { y: 26, autoAlpha: 0 });
    gsap.set('[data-rule]', { scaleX: 0, transformOrigin: '0 50%' });
    gsap.set('[data-hl]', { '--hl': '0%' });
    titles.forEach((t) => gsap.set(t.chars, { autoAlpha: 0 }));

    // ── The load: page one is laid down on the desk ──
    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
    intro
      .from('[data-intro="sheet"]', {
        y: 160,
        rotateX: 28,
        rotateZ: -2.5,
        scale: 0.9,
        autoAlpha: 0,
        duration: 1.3,
        transformPerspective: 1600,
        transformOrigin: '50% 0%',
        clearProps: 'transform',
      })
      .from('[data-intro="bar"]', { yPercent: -100, duration: 1 }, 0.5)
      .to(name.chars, { yPercent: 0, stagger: 0.025, duration: 1.1 }, 0.55)
      .to('[data-intro="line"]', { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9 }, 0.9);
    release();

    // Scroll reveals are measured only once the sheet has landed — measuring
    // mid-flight would place every trigger on page one too low — then they
    // catch up on whatever is already in view.
    intro.call(
      () => {
        titles.forEach((t) =>
          gsap.to(t.chars, {
            autoAlpha: 1,
            stagger: 0.022,
            duration: 0.01,
            ease: 'none',
            scrollTrigger: { trigger: t.elements[0], start: 'top 88%', once: true },
          }),
        );

        ScrollTrigger.batch('[data-rule]', {
          start: 'top 90%',
          once: true,
          onEnter: (els) => gsap.to(els, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', stagger: 0.1 }),
        });

        ScrollTrigger.batch('[data-reveal]', {
          start: 'top bottom-=40',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07, overwrite: true }),
        });

        ScrollTrigger.batch('[data-hl]', {
          start: 'top 80%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { '--hl': '100%', duration: 0.9, ease: 'power2.inOut', stagger: 0.25, delay: 0.35 }),
        });

        q('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const n = { v: 0 };
          el.textContent = '0';
          gsap.to(n, {
            v: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = String(Math.round(n.v));
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        ScrollTrigger.refresh();
        // Web fonts swapping in shift the layout; measure again once they settle.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
      },
      undefined,
      1.3,
    );

    // ── Later pages settle onto the stack as they arrive ──
    q('.sheet:not([data-intro])').forEach((sheet) => {
      gsap.from(sheet, {
        y: 90,
        rotateX: 9,
        scale: 0.96,
        transformPerspective: 1800,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: sheet, start: 'top bottom', end: 'top 55%', scrub: 0.6 },
      });
    });

    // ── The experience line fills as you read down the roles ──
    q('[data-track]').forEach((track) => {
      gsap.fromTo(
        track,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: '50% 0%',
          scrollTrigger: { trigger: track.parentElement, start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
        },
      );
    });

    return () => {
      name.revert();
      titles.forEach((t) => t.revert());
    };
  });

  return null;
}
