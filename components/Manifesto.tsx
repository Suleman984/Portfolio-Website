'use client';

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import { STATS } from '@/data';
import { m } from './motion';

const STATEMENT =
  'I build software end to end. Interfaces that feel instant, services that hold up under load, and data models that still make sense a year later.';

const DIM = 0.16;
const SPREAD = 0.72;
const WORD_WINDOW = 0.18;

/** Each word gets its own slice of the scroll range, slightly overlapping its neighbours. */
function wordRange(index: number, count: number) {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  return { start, end: Math.min(1, start + WORD_WINDOW) };
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = STATEMENT.split(' ');

  return (
    <section id="manifesto" ref={ref}>
      <div className="mf-pin">
        <div className="mf-inner">
          <div className="mf-rule" aria-hidden="true">
            <m.span style={{ scaleY: reduced ? 1 : scrollYProgress }} />
          </div>

          <div className="mf-content">
            <p className="mf-kicker">How I work</p>
            <p className="mf-statement" aria-label={STATEMENT}>
              {words.map((word, i) => (
                <Word
                  key={`${word}-${i}`}
                  progress={scrollYProgress}
                  range={wordRange(i, words.length)}
                  reduced={Boolean(reduced)}
                >
                  {word}
                </Word>
              ))}
            </p>

            <div className="mf-stats">
              {STATS.map((s) => (
                <div className="mf-stat" key={s.label}>
                  <Counter target={s.target} suffix={s.suffix} />
                  <span className="mf-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string;
  progress: MotionValue<number>;
  range: { start: number; end: number };
  reduced: boolean;
}) {
  const opacity = useTransform(progress, [range.start, range.end], [DIM, 1], { clamp: true });
  return (
    <>
      <m.span aria-hidden="true" style={reduced ? undefined : { opacity }}>
        {children}
      </m.span>{' '}
    </>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.5, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, count, target]);

  return (
    <m.span ref={ref} className="mf-stat-value">
      {text}
    </m.span>
  );
}
