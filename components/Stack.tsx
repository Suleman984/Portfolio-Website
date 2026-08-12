'use client';

import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SKILLS } from '@/data';
import { Reveal, m } from './motion';

/* Flattened into lanes rather than tabs — the whole stack is visible at once,
   and scroll drives the horizontal drift instead of a click. */
const LANES = [
  { label: 'Frontend', keys: ['frontend'] as const, drift: -160 },
  { label: 'Backend & data', keys: ['backend', 'database'] as const, drift: 190 },
  { label: 'Languages & tools', keys: ['languages', 'tools'] as const, drift: -130 },
];

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section id="stack" ref={ref} className="stack">
      <Reveal className="stack-head">
        <div className="sec-tag">Toolkit</div>
        <h2 className="stack-title">
          The tools I actually
          <br />
          <span className="grad-text">ship with.</span>
        </h2>
      </Reveal>

      <div className="stack-lanes">
        {LANES.map((lane, i) => (
          <Lane
            key={lane.label}
            label={lane.label}
            items={lane.keys.flatMap((k) => SKILLS[k].map((s) => s.label))}
            drift={reduced ? 0 : lane.drift}
            progress={scrollYProgress}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

function Lane({
  label,
  items,
  drift,
  progress,
  index,
}: {
  label: string;
  items: string[];
  drift: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
}) {
  const x = useTransform(progress, [0, 1], [drift, -drift]);

  return (
    <div className="stack-lane">
      <span className="stack-lane-label">{label}</span>
      <m.div className="stack-lane-row" style={{ x }}>
        {items.map((item, i) => (
          <m.span
            className="stack-chip"
            key={item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08 + i * 0.025 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            {item}
          </m.span>
        ))}
      </m.div>
    </div>
  );
}
