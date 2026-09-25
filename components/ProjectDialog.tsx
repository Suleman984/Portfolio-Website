'use client';

import { useGSAP } from '@gsap/react';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { PROJECTS, type Project } from '@/data';
import { getLenis, gsap, prefersReducedMotion } from '@/lib/scroll';

const OpenProject = createContext<(id: number) => void>(() => {});

/** Opens a project's case sheet. Usable from any section under the provider. */
export const useOpenProject = () => useContext(OpenProject);

export function ProjectLink({ id, className, children }: { id: number; className?: string; children: ReactNode }) {
  const open = useOpenProject();
  return (
    <button type="button" className={className} onClick={() => open(id)} aria-haspopup="dialog">
      {children}
    </button>
  );
}

const hasUrl = (u: string) => Boolean(u) && u !== '#';

export function ProjectDialogProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((id: number) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setProject(PROJECTS.find((p) => p.id === id) ?? null);
  }, []);

  const closed = useCallback(() => {
    setProject(null);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  return (
    <OpenProject.Provider value={open}>
      {children}
      {project && <CaseSheet project={project} onClosed={closed} />}
    </OpenProject.Provider>
  );
}

function CaseSheet({ project, onClosed }: { project: Project; onClosed: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const [name, subtitle] = project.title.split(' — ');

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.cs-scrim', { autoAlpha: 0, duration: 0.4, ease: 'power2.out' })
        .from('.cs-sheet', { yPercent: 40, rotateX: 12, autoAlpha: 0, duration: 0.9, transformOrigin: '50% 100%' }, 0)
        .from('.cs-anim', { y: 18, autoAlpha: 0, stagger: 0.045, duration: 0.7 }, 0.2);
    },
    { scope: root },
  );

  const close = contextSafe(() => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) return onClosed();
    gsap
      .timeline({ onComplete: onClosed })
      .to('.cs-sheet', { yPercent: 30, autoAlpha: 0, duration: 0.45, ease: 'power3.in' })
      .to('.cs-scrim', { autoAlpha: 0, duration: 0.3 }, '-=0.2');
  });
  // Latest `close` for the mount-only listeners below.
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add('is-locked');
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
      // Keep Tab inside the dialog.
      if (e.key === 'Tab' && root.current) {
        const focusable = root.current.querySelectorAll<HTMLElement>('a[href], button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-locked');
      lenis?.start();
    };
  }, []);

  return (
    <div ref={root} className="cs" role="dialog" aria-modal="true" aria-labelledby="cs-title">
      <div className="cs-scrim" onClick={close} />
      <div className="cs-wrap" data-lenis-prevent onClick={(e) => e.target === e.currentTarget && close()}>
        <article className="cs-sheet paper">
          <header className="cs-head cs-anim">
            <span className="mono">Case sheet · {project.tag}</span>
            <button ref={closeBtn} type="button" className="cs-close" onClick={close} aria-label="Close case sheet">
              Close <kbd>Esc</kbd>
            </button>
          </header>

          <h2 id="cs-title" className="cs-title cs-anim">
            {name}
            {subtitle && <span>{subtitle}</span>}
          </h2>
          <p className="cs-stack cs-anim">{project.tech.join(' · ')}</p>
          <div className="rule cs-anim" />

          <p className="cs-desc cs-anim">{project.desc}</p>

          <h3 className="cs-label cs-anim">Key work</h3>
          <ul className="bullets">
            {project.highlights.map((h) => (
              <li key={h} className="cs-anim">
                {h}
              </li>
            ))}
          </ul>

          <footer className="cs-links cs-anim">
            {hasUrl(project.liveUrl) && (
              <a className="btn btn--ink" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit live ↗
              </a>
            )}
            {hasUrl(project.githubUrl) && (
              <a className="btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                Read the code ↗
              </a>
            )}
            {!hasUrl(project.liveUrl) && !hasUrl(project.githubUrl) && (
              <span className="muted">Private or client codebase. Walkthrough available on request.</span>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}
