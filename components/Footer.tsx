'use client';

import { PERSONAL } from '@/data';

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-logo">[MS]</div>
        <div>
          © {new Date().getFullYear()} {PERSONAL.name} · Built with Next.js &amp; Motion
        </div>
      </div>
      <div className="footer-right">
        <a href="#hero" className="footer-link">
          ↑ Top
        </a>
        <a href={`mailto:${PERSONAL.email}`} className="footer-link">
          Email
        </a>
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="footer-link">
          GitHub
        </a>
      </div>
    </footer>
  );
}
