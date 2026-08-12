'use client';

import { useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';
import { m } from './motion';

const INTERACTIVE = 'a,button,.pcard,.ex-card,.ach-card,.sk-chip,.ccard,.snav-btn,.info-row,.svc-card,.stat-card';

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringScale = useSpring(scale, { stiffness: 340, damping: 26 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      scale.set(el ? 1.75 : 1);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
    };
  }, [x, y, scale]);

  return (
    <>
      <m.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <m.div className="cursor-ring" style={{ x: ringX, y: ringY, scale: ringScale }} aria-hidden="true" />
    </>
  );
}
