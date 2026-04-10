'use client';
import { PERSONAL } from '@/data';

export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <div className="footer-logo">[MS]</div>
        <div>© 2025 {PERSONAL.name} · {PERSONAL.role}</div>
      </div>
      <div className="footer-right">
        <a href="#hero" className="footer-link">↑ Top</a>
        <a href={`mailto:${PERSONAL.email}`} className="footer-link">Email</a>
        <a href={PERSONAL.linkedin} className="footer-link">LinkedIn</a>
      </div>
    </footer>
  );
}
