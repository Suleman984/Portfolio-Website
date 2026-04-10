'use client';
import { ACHIEVEMENTS } from '@/data';

export default function Achievements() {
  return (
    <section id="achievements" style={{ background: 'var(--black)' }}>
      <div className="sec-tag reveal-up">Recognition</div>
      <h2 className="sec-title reveal-up">Achievements</h2>

      <div className="ach-grid">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="ach-card reveal-scale">
            <div className="ach-icon-wrap">{a.icon}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
