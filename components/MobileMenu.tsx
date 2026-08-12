'use client';

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { EASE_OUT, m } from './motion';

const SECTIONS = ['work', 'stack', 'journey', 'profile', 'contact'];

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="mobile-menu"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {SECTIONS.map((s, i) => (
            <m.a
              key={s}
              href={`#${s}`}
              onClick={onClose}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: EASE_OUT }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </m.a>
          ))}
        </m.div>
      )}
    </AnimatePresence>
  );
}
