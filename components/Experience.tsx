'use client';
import { EXPERIENCES } from '@/data';

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--black)' }}>
      <div className="sec-tag reveal-up">Career Path</div>
      <h2 className="sec-title reveal-up">Work Experience</h2>
      <p className="sec-desc reveal-up">Production software across diverse domains and teams.</p>

      <div className="exp-list">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="exp-item">
            <div className="exp-box reveal-up">
              <div className="exp-left">
                <div className="exp-company-logo">{exp.icon}</div>
                <div className={`exp-badge2 ${exp.type}`}>
                  {exp.type === 'cur' ? 'Current' : exp.type === 'prev' ? 'Previous' : 'Internship'}
                </div>
                <div className="exp-period">{exp.period}</div>
              </div>
              <div className="exp-right">
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.icon} {exp.company} &nbsp;·&nbsp; Islamabad</div>
                <ul className="exp-desc-list">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="exp-tech-row">
                  {exp.tags.map(tag => <span key={tag} className="e-tag">{tag}</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
