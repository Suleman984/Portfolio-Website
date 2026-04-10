'use client';
import { SKILLS } from '@/data';

const tabs = [
  { key: 'frontend',  icon: '🎨', label: 'Frontend',  count: 10 },
  { key: 'backend',   icon: '⚙️', label: 'Backend',   count: 6  },
  { key: 'database',  icon: '🗄️', label: 'Database',  count: 4  },
  { key: 'languages', icon: '⚡', label: 'Languages', count: 6  },
  { key: 'tools',     icon: '🛠️', label: 'Tools',     count: 5  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--black2)' }}>
      <div className="sec-tag reveal-up">Tech Stack</div>
      <h2 className="sec-title reveal-up">Skills &amp; Technologies</h2>
      <p className="sec-desc reveal-up">The tools I use to build fast, scalable, and beautiful software.</p>

      <div className="skills-flex">
        {/* Tab nav */}
        <div className="skill-nav reveal-left">
          {tabs.map(t => (
            <div key={t.key} className={`snav-btn${t.key === 'frontend' ? ' active' : ''}`} data-panel={t.key}>
              <span className="sn-icon">{t.icon}</span>
              {t.label}
              <span className="sn-count">{t.count}</span>
            </div>
          ))}
        </div>

        {/* Panels */}
        <div className="skills-content reveal-right">
          {tabs.map(t => (
            <div key={t.key} className={`skill-panel${t.key === 'frontend' ? ' active' : ''}`} id={`panel-${t.key}`}>
              {SKILLS[t.key].map(sk => (
                <div key={sk.label} className="sk-chip">
                  <span className="sk-dot" />
                  {sk.label}
                  {sk.tip && <span className="sk-tip">{sk.tip}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
