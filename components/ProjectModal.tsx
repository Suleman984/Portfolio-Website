'use client';
import { useEffect, useState } from 'react';
import { PROJECTS, Project } from '@/data';

export default function ProjectModal() {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    // Expose opener to window so Projects component can call it
    (window as any).__openModal = (id: number) => {
      const p = PROJECTS.find(x => x.id === id);
      if (p) setProject(p);
    };
  }, []);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const overlay = document.getElementById('proj-modal-overlay');
      overlay?.classList.add('open');

      // GSAP stagger animations
      const gsap = (window as any).gsap;
      if (gsap) {
        gsap.fromTo('#modal-img-wrap',      { opacity:0, y:20 }, { opacity:1, y:0, duration:.5, ease:'power3.out', delay:.1 });
        gsap.fromTo('.modal-tag',           { opacity:0, x:-15 }, { opacity:1, x:0, duration:.4, ease:'power3.out', delay:.2 });
        gsap.fromTo('.modal-title',         { opacity:0, y:25 }, { opacity:1, y:0, duration:.55, ease:'power4.out', delay:.25 });
        gsap.fromTo('.modal-desc',          { opacity:0, y:20 }, { opacity:1, y:0, duration:.45, ease:'power3.out', delay:.35 });
        gsap.fromTo('.modal-tech-pill',     { opacity:0, scale:.8 }, { opacity:1, scale:1, duration:.35, stagger:.04, ease:'back.out(1.7)', delay:.4 });
        gsap.fromTo('.modal-highlights li', { opacity:0, x:-20 }, { opacity:1, x:0, duration:.4, stagger:.06, ease:'power3.out', delay:.5 });
        gsap.fromTo('.modal-actions',       { opacity:0, y:15 }, { opacity:1, y:0, duration:.4, ease:'power3.out', delay:.7 });
      }
    }
  }, [project]);

  const close = () => {
    const overlay = document.getElementById('proj-modal-overlay');
    const modal   = document.getElementById('proj-modal');
    const gsap    = (window as any).gsap;

    if (gsap && modal) {
      gsap.to(modal, {
        y: 40, scale: .96, opacity: 0, duration: .3, ease: 'power3.in',
        onComplete: () => {
          overlay?.classList.remove('open');
          gsap.set(modal, { y: 0, scale: 1, opacity: 1 });
          document.body.style.overflow = '';
          setProject(null);
        },
      });
    } else {
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
      setProject(null);
    }
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const hasLive = project?.liveUrl && project.liveUrl !== '#';
  const hasGH   = project?.githubUrl && project.githubUrl !== '#';

  return (
    <div id="proj-modal-overlay" role="dialog" aria-modal="true" onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div id="proj-modal">
        {/* Hero image / placeholder */}
        <div id="modal-img-wrap">
          {project?.img
            ? <img className="modal-hero-img" src={project.img} alt={project.title} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            : project && (
              <div className="modal-hero-placeholder" style={{ background: project.imgBg }}>
                {project.emoji}
              </div>
            )
          }
        </div>

        <div className="modal-body">
          <div className="modal-top">
            <span className="modal-tag">{project?.tag}</span>
            <button className="modal-close" onClick={close} aria-label="Close">✕</button>
          </div>

          <h2 className="modal-title">{project?.title}</h2>
          <p className="modal-desc">{project?.desc}</p>

          <div className="modal-section-label">Tech Stack</div>
          <div className="modal-tech-grid">
            {project?.tech.map(t => <span key={t} className="modal-tech-pill">{t}</span>)}
          </div>

          <div className="modal-divider" />

          <div className="modal-section-label">Key Highlights</div>
          <ul className="modal-highlights">
            {project?.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>

          <div className="modal-actions">
            {hasLive && (
              <a href={project!.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-btn-primary">
                <span>Live Demo</span><span>↗</span>
              </a>
            )}
            {hasGH && (
              <a href={project!.githubUrl} target="_blank" rel="noopener noreferrer" className="modal-btn-ghost">
                <span>View Code</span><span>⌥</span>
              </a>
            )}
            {!hasLive && !hasGH && (
              <span style={{ color: 'var(--muted2)', fontSize: '.875rem' }}>🔒 Private / NDA project</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
