'use client';

import { useEffect } from 'react';

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
    <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu" aria-hidden={!open}>
      {['about', 'skills', 'experience', 'projects', 'contact'].map((s) => (
        <a key={s} href={`#${s}`} className="mob-link" onClick={onClose}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </a>
      ))}
    </div>
  );
}
