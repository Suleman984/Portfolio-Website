'use client';

import { AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { EASE_OUT, m } from './motion';

export default function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 400));

  return (
    <>
      <m.div id="scroll-bar" style={{ scaleX }} aria-hidden="true" />
      <AnimatePresence>
        {showTop && (
          <m.button
            id="to-top"
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            ↑
          </m.button>
        )}
      </AnimatePresence>
    </>
  );
}
