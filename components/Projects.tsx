'use client';
import { PROJECTS } from '@/data';

export default function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--black2)' }}>
      <div className="proj-header-row">
        <div>
          <div className="sec-tag reveal-up">Work</div>
          <h2 className="sec-title reveal-up">Featured Projects</h2>
          <p className="sec-desc reveal-up">Real-world solutions solving real problems.</p>
        </div>
      </div>

      <div className="proj-bento">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="pcard reveal-up"
            data-tilt
            data-tilt-max={i === 0 || i === 4 ? '4' : '6'}
            data-tilt-speed="400"
            data-tilt-perspective="1200"
          >
            {/* Image area */}
            <div
              className="pcard-img"
              style={!p.img ? { background: p.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center' } : undefined}
              onClick={() => (window as any).__openModal?.(p.id)}
            >
              {p.img
                ? <img src={p.img} alt={p.title} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                : <span style={{ fontSize: '4.5rem', opacity: .1, position: 'relative', zIndex: 1 }}>{p.emoji}</span>
              }
              <div className="pcard-img-overlay" />
              <div className="pcard-num">0{p.id}</div>
              <div className="pcard-tag">{p.tag}</div>
            </div>

            {/* Body */}
            <div className="pcard-body">
              <div className="pcard-title">{p.title}</div>
              <div className="pcard-desc">{p.desc.slice(0, 110)}…</div>
              <div className="pcard-tech">
                {p.tech.slice(0, 4).map(t => <span key={t} className="ptag">{t}</span>)}
              </div>
              <div className="pcard-foot">
                <button
                  className="plink"
                  onClick={() => (window as any).__openModal?.(p.id)}
                >
                  View Project <span>→</span>
                </button>
                <button
                  className="parrow"
                  onClick={() => (window as any).__openModal?.(p.id)}
                >
                  ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
