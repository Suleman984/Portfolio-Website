'use client';
import { STATS } from '@/data';

export default function Stats() {
  return (
    <section id="stats" style={{ padding: '5rem 6vw', background: 'var(--black3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 2 }}>
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card reveal-scale">
            <span className="stat-icon">{s.icon}</span>
            <span className="stat-number" data-target={s.target} data-suffix={s.suffix}>0{s.suffix}</span>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
