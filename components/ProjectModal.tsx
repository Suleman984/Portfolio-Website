'use client';

import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import type { Project } from '@/data';
import { EASE_OUT, m } from './motion';

const listVariants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  const hasLive = project?.liveUrl && project.liveUrl !== '#';
  const hasGithub = project?.githubUrl && project.githubUrl !== '#';

  return (
    <AnimatePresence>
      {project && (
        <m.div
          id="proj-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <m.div
            id="proj-modal"
            initial={{ opacity: 0, y: 48, scale: 0.95, rotateX: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            style={{ transformPerspective: 1400 }}
          >
            {project.img ? (
              <img className="modal-hero-img" src={project.img} alt={project.title} />
            ) : (
              <div className="modal-hero-placeholder" style={{ background: project.imgBg }}>
                {project.emoji}
              </div>
            )}

            <div className="modal-body">
              <div className="modal-top">
                <span className="modal-tag">{project.tag}</span>
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                  ✕
                </button>
              </div>

              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-desc">{project.desc}</p>

              <div className="modal-section-label">Tech Stack</div>
              <m.div
                className="modal-tech-grid"
                variants={listVariants}
                initial="hidden"
                animate="shown"
              >
                {project.tech.map((t) => (
                  <m.span key={t} className="modal-tech-pill" variants={itemVariants}>
                    {t}
                  </m.span>
                ))}
              </m.div>

              <div className="modal-divider" />

              <div className="modal-section-label">Key Highlights</div>
              <m.ul
                className="modal-highlights"
                variants={listVariants}
                initial="hidden"
                animate="shown"
              >
                {project.highlights.map((h) => (
                  <m.li key={h} variants={itemVariants}>
                    {h}
                  </m.li>
                ))}
              </m.ul>

              <div className="modal-actions">
                {hasLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-primary"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn-ghost"
                  >
                    <span>View Code</span>
                    <span>↗</span>
                  </a>
                )}
                {!hasLive && !hasGithub && (
                  <span style={{ color: 'var(--muted2)', fontSize: '.875rem' }}>
                    🔒 Private / NDA project
                  </span>
                )}
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
