'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ACHIEVEMENTS, EXPERIENCES, PERSONAL } from '@/data';
import { EASE_OUT, Reveal, m } from './motion';

/* Experience, education and awards live on one spine — three separate
   card grids was three times the chrome for the same information. */
type Entry = {
  id: string;
  kind: 'role' | 'study' | 'award';
  title: string;
  org: string;
  period: string;
  bullets: string[];
  tags?: string[];
};

const ENTRIES: Entry[] = [
  ...EXPERIENCES.map<Entry>((e) => ({
    id: `${e.company}-${e.period}`,
    kind: 'role',
    title: e.role,
    org: e.company,
    period: e.period,
    bullets: e.bullets,
    tags: e.tags,
  })),
  {
    id: 'degree',
    kind: 'study',
    title: PERSONAL.degree,
    org: PERSONAL.university,
    period: PERSONAL.gradYear,
    bullets: [
      `Graduated with a GPA of ${PERSONAL.gpa}.`,
      'Final year project: e-commerce optimisation through social analytics and ML.',
    ],
  },
  ...ACHIEVEMENTS.map<Entry>((a) => ({
    id: a.title,
    kind: 'award',
    title: a.title,
    org: 'Recognition',
    period: '2023',
    bullets: [a.desc],
  })),
];

const KIND_LABEL = { role: 'Role', study: 'Education', award: 'Award' } as const;

export default function Journey() {
  return (
    <section id="journey" className="journey">
      <Reveal className="jr-head">
        <div className="sec-tag">Track record</div>
        <h2 className="jr-title">Where I&apos;ve been</h2>
      </Reveal>

      <div className="jr-spine">
        {ENTRIES.map((entry, i) => (
          <Row key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}

function Row({ entry, index }: { entry: Entry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <m.div
      ref={ref}
      className={`jr-row jr-${entry.kind}`}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <div className="jr-aside">
        <span className="jr-kind">{KIND_LABEL[entry.kind]}</span>
        <span className="jr-period">{entry.period}</span>
        <span className="jr-num">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="jr-node" aria-hidden="true">
        <m.span
          className="jr-dot"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
        />
        <m.span
          className="jr-line"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
      </div>

      <div className="jr-main">
        <h3 className="jr-role">{entry.title}</h3>
        <p className="jr-org">{entry.org}</p>
        <ul className="jr-bullets">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {entry.tags && (
          <div className="jr-tags">
            {entry.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}
