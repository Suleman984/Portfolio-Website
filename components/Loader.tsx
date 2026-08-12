'use client';

import { AnimatePresence, animate, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { EASE_OUT, m } from './motion';

export default function Loader() {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);
  const label = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 1.1,
      ease: 'easeInOut',
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          id="loader"
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
        >
          <m.div
            className="loader-logo"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            MS.
          </m.div>
          <div className="loader-bar-track">
            <m.div className="loader-bar" style={{ scaleX }} />
          </div>
          <m.div className="loader-pct">{label}</m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
