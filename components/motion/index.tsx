'use client';

import {
  LazyMotion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import * as m from 'motion/react-m';
import { useCallback, type PointerEvent, type ReactNode } from 'react';

/* domAnimation (~15kb) is fetched as its own chunk after hydration, so it
   never blocks first paint. */
const loadFeatures = () => import('./features').then((r) => r.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, amount: 0.25 } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Entry direction. `depth` adds an X-axis rotation for a 3D tilt-up. */
  from?: 'up' | 'left' | 'right' | 'depth';
  style?: React.CSSProperties;
};

const OFFSETS = {
  up: { y: 44 },
  left: { x: -56 },
  right: { x: 56 },
  depth: { y: 64, rotateX: -14, scale: 0.94 },
} as const;

export function Reveal({ children, className, delay = 0, from = 'up', style }: RevealProps) {
  const reduced = useReducedMotion();
  const hidden = reduced ? { opacity: 0 } : { opacity: 0, ...OFFSETS[from] };
  // `depth` rotates on X, which needs a perspective — own it here so callers
  // don't have to remember to set one on the parent.
  const perspective = from === 'depth' && !reduced ? { transformPerspective: 1300 } : null;

  return (
    <m.div
      className={className}
      style={{ ...style, ...perspective }}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateX: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}

/** Parent that staggers any `<RevealItem>` descendants. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <m.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </m.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  shown: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.3 } },
};

export function RevealItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div className={className} style={style} variants={reduced ? reducedItemVariants : itemVariants}>
      {children}
    </m.div>
  );
}

const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Pointer-driven 3D tilt. Every animated property is a transform, so the whole
 * effect stays on the compositor — no layout or paint work per pointer move.
 */
export function Tilt({
  children,
  className,
  max = 9,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), TILT_SPRING);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    },
    [px, py],
  );

  const onLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  if (reduced) return <div className={className} style={style}>{children}</div>;

  return (
    <m.div
      className={className}
      style={{ ...style, rotateX, rotateY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </m.div>
  );
}

export { m };
