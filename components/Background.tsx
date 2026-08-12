'use client';

import { useScroll, useTransform } from 'motion/react';
import { m } from './motion';

export default function Background() {
  const { scrollYProgress } = useScroll();
  const orbAY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const orbBY = useTransform(scrollYProgress, [0, 1], [0, 240]);

  return (
    <div className="bg-layer" aria-hidden="true">
      <m.div style={{ y: orbAY }} className="bg-orb a" />
      <m.div style={{ y: orbBY }} className="bg-orb b" />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}
