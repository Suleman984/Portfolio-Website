'use client';

import { useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { PERSONAL } from '@/data';
import { EASE_OUT, m } from './motion';

const LINKS = [
  { label: 'GitHub', href: PERSONAL.github },
  { label: 'LinkedIn', href: PERSONAL.linkedin },
  { label: 'Call', href: `tel:${PERSONAL.phone.replace(/[^+\d]/g, '')}` },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  /* This is the last section, so anything past "centre of the section meets
     centre of the viewport" is unreachable — the page runs out of scroll and
     the animation would never complete. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);

  return (
    <section id="contact" ref={ref} className="contact">
      <m.div className="ct-inner" style={{ scale, opacity }}>
        <p className="ct-kicker">Available now · Islamabad / remote</p>

        <h2 className="ct-title">
          Let&apos;s build
          <br />
          <span className="grad-text">something great.</span>
        </h2>

        <m.a
          href={`mailto:${PERSONAL.email}`}
          className="ct-mail"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          {PERSONAL.email}
          <span className="ct-mail-arrow">→</span>
        </m.a>

        <div className="ct-links">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {l.label} <span>↗</span>
            </a>
          ))}
        </div>
      </m.div>
    </section>
  );
}
