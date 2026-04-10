'use client';
import { SERVICES } from '@/data';

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--black)' }}>
      <div className="sec-tag reveal-up">What I Do</div>
      <h2 className="sec-title reveal-up">Services</h2>
      <p className="sec-desc reveal-up">How I can help bring your ideas to life.</p>

      <div className="services-grid">
        {SERVICES.map(s => (
          <div key={s.num} className="svc-card reveal-up">
            <div className="svc-num">{s.num}</div>
            <div className="svc-icon">{s.icon}</div>
            <div className="svc-title">{s.title}</div>
            <div className="svc-desc">{s.desc}</div>
            <div className="svc-tags">
              {s.tags.map(tag => <span key={tag} className="svc-tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
