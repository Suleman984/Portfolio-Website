'use client';

import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { CVS, PERSONAL } from '@/data';
import { gsap, ScrollTrigger } from '@/lib/scroll';

export const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Toolbar() {
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useState('');

  useGSAP(
    () => {
      gsap.fromTo(
        '.tb-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        },
      );
      // The current section is the last heading above the reading line.
      const heads = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const update = () => {
        const line = window.innerHeight * 0.45;
        let current = '';
        for (const h of heads) if (h.getBoundingClientRect().top < line) current = h.id;
        setActive(current);
      };
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update, onRefresh: update });
    },
    { scope: bar },
  );

  // Close the download menu on outside click.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) menu.current.open = false;
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  return (
    <header ref={bar} className="tb" data-intro="bar">
      <div className="tb-inner">
        <a href="#top" className="tb-brand" aria-label="Back to top">
          <span className="tb-mark">MS</span>
          <span className="tb-file mono">
            {PERSONAL.name.replace(' ', '_')}<span className="muted">.cv</span>
          </span>
        </a>

        <nav className="tb-nav" aria-label="Sections">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : undefined}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </a>
          ))}
        </nav>

        <div className="tb-actions">
          <details ref={menu} className="tb-menu">
            <summary className="btn btn--sm">
              Download CV <span aria-hidden="true">↓</span>
            </summary>
            <div className="tb-pop paper">
              <p className="mono muted">Tailored editions · PDF</p>
              {CVS.map((cv) => (
                <a key={cv.href} href={cv.href} download onClick={() => menu.current?.removeAttribute('open')}>
                  {cv.label}
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </div>
          </details>
          <a href={`mailto:${PERSONAL.email}`} className="btn btn--sm btn--ink tb-hire">
            Hire me
          </a>
        </div>
      </div>
      <div className="tb-progress" />
    </header>
  );
}
