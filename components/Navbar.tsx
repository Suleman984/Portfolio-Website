'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { PERSONAL } from '@/data';
import { EASE_OUT, m } from './motion';

const SECTIONS = ['work', 'stack', 'journey', 'profile', 'contact'];

type NavbarProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export default function Navbar({ menuOpen, onMenuToggle }: NavbarProps) {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState('');

  useMotionValueEvent(scrollY, 'change', (v) => setLifted(v > 80));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <m.nav
      id="nav"
      className={lifted ? 'lifted' : undefined}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
    >
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">[</span>MS<span className="logo-bracket">]</span>
      </a>

      {/* Past the fold the links lift off the bar into a floating capsule.
          Only the backdrop animates — the links themselves never move. */}
      <div className="nav-pill">
        <m.div
          className="nav-pill-bg"
          aria-hidden="true"
          initial={false}
          animate={lifted ? { opacity: 1, scaleX: 1, scaleY: 1 } : { opacity: 0, scaleX: 0.94, scaleY: 0.7 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        />
        <ul className="nav-links">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className={active === s ? 'active' : undefined}>
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a href={`mailto:${PERSONAL.email}`} className="nav-cta">
        Hire me →
      </a>

      <button
        type="button"
        className={`ham-btn${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={onMenuToggle}
      >
        <div className="ham-line" />
        <div className="ham-line" />
        <div className="ham-line" />
      </button>
    </m.nav>
  );
}
