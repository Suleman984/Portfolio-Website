'use client';

import { useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ARCHIVE_PROJECTS, FEATURED_PROJECTS, type Project } from '@/data';
import { EASE_OUT, Reveal, m } from './motion';

/** Below this width the rail becomes a plain vertical stack — sideways scroll on touch is hostile. */
const RAIL_MIN_WIDTH = 900;

export default function Work({ onOpen }: { onOpen: (id: number) => void }) {
  const [railMode, setRailMode] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${RAIL_MIN_WIDTH}px)`);
    const update = () => setRailMode(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <>
      {!railMode || reduced ? <WorkStack onOpen={onOpen} /> : <WorkRail onOpen={onOpen} />}
      <Archive onOpen={onOpen} />
    </>
  );
}

/* ── Pinned horizontal rail ─────────────────────────────────────────── */

function WorkRail({ onOpen }: { onOpen: (id: number) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const barScale = useTransform(smooth, [0, 1], [0.04, 1]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => setDistance(Math.max(0, rail.scrollWidth - window.innerWidth + 96));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work"
      style={{ height: `${100 + FEATURED_PROJECTS.length * 62}vh` }}
    >
      <div className="work-pin">
        <header className="work-head">
          <div>
            <div className="sec-tag">Selected work</div>
            <h2 className="work-title">Things I&apos;ve shipped</h2>
          </div>
          <p className="work-hint">Scroll →</p>
        </header>

        <m.div className="work-rail" ref={railRef} style={{ x }}>
          {FEATURED_PROJECTS.map((project, i) => (
            <RailCard
              key={project.id}
              project={project}
              index={i}
              count={FEATURED_PROJECTS.length}
              progress={smooth}
              onOpen={onOpen}
            />
          ))}
          <div className="work-end">
            <p>That&apos;s the tour.</p>
            <a href="#contact" className="btn-primary">
              <span>Start a project</span>
              <span>→</span>
            </a>
          </div>
        </m.div>

        <div className="work-bar" aria-hidden="true">
          <m.span style={{ scaleX: barScale }} />
        </div>
      </div>
    </section>
  );
}

function RailCard({
  project,
  index,
  count,
  progress,
  onOpen,
}: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
  onOpen: (id: number) => void;
}) {
  /* Cards swing through Y as they cross the viewport centre, so the rail reads
     as a carousel in depth rather than a flat strip sliding past. */
  const centre = count <= 1 ? 0.5 : index / (count - 1);
  const span = 0.42;
  const rotateY = useTransform(
    progress,
    [centre - span, centre, centre + span],
    [16, 0, -16],
    { clamp: true },
  );
  const scale = useTransform(
    progress,
    [centre - span, centre, centre + span],
    [0.93, 1, 0.93],
    { clamp: true },
  );

  return (
    <m.article
      className="work-card"
      style={{ rotateY, scale, transformPerspective: 1600 }}
      onClick={() => onOpen(project.id)}
    >
      <WorkCardInner project={project} index={index} />
    </m.article>
  );
}

/* ── Vertical fallback ──────────────────────────────────────────────── */

function WorkStack({ onOpen }: { onOpen: (id: number) => void }) {
  return (
    <section id="work" className="work work-stacked">
      <Reveal className="work-head">
        <div>
          <div className="sec-tag">Selected work</div>
          <h2 className="work-title">Things I&apos;ve shipped</h2>
        </div>
      </Reveal>

      <div className="work-stack">
        {FEATURED_PROJECTS.map((project, i) => (
          <Reveal key={project.id} from="depth" delay={(i % 2) * 0.08}>
            <article className="work-card" onClick={() => onOpen(project.id)}>
              <WorkCardInner project={project} index={i} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Archive index ──────────────────────────────────────────────────
   Everything not on the rail, as a dense scannable table rather than
   another wall of cards. */

function Archive({ onOpen }: { onOpen: (id: number) => void }) {
  return (
    <section id="archive" className="archive">
      <Reveal className="ar-head">
        <div className="sec-tag">Archive</div>
        <h2 className="ar-title">
          Also built <span className="ar-count">{ARCHIVE_PROJECTS.length}</span>
        </h2>
      </Reveal>

      <ul className="ar-list">
        {ARCHIVE_PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={Math.min(i, 5) * 0.05}>
            <li className="ar-row">
              <button type="button" className="ar-open" onClick={() => onOpen(project.id)}>
                <span className="ar-emoji" aria-hidden="true">
                  {project.emoji}
                </span>
                <span className="ar-name">{project.title}</span>
                <span className="ar-tag">{project.tag}</span>
                <span className="ar-stack">{project.tech.slice(0, 3).join(' · ')}</span>
                <span className="ar-arrow" aria-hidden="true">
                  →
                </span>
              </button>
              {/* Always rendered so the row's trailing column keeps its width
                  whether or not the project has a public repo. */}
              <span className="ar-git-slot">
                {project.githubUrl ? (
                  <a
                    className="ar-git"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                  >
                    Code ↗
                  </a>
                ) : (
                  <span className="ar-git ar-git-none" aria-hidden="true">
                    Private
                  </span>
                )}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ── Shared card body ───────────────────────────────────────────────── */

function WorkCardInner({ project, index }: { project: Project; index: number }) {
  const [failed, setFailed] = useState(false);
  const showImage = project.img && !failed;

  return (
    <>
      <div className="wc-media" style={showImage ? undefined : { background: project.imgBg }}>
        {showImage ? (
          <img src={project.img!} alt={project.title} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="wc-emoji">{project.emoji}</span>
        )}
        <span className="wc-index">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="wc-body">
        <div className="wc-tag">{project.tag}</div>
        <h3 className="wc-title">{project.title}</h3>
        <p className="wc-desc">{project.desc}</p>
        <ul className="wc-tech">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="wc-foot">
          <m.span className="wc-open" whileHover={{ gap: 16 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
            Case study <span>→</span>
          </m.span>
          <span className="wc-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} source on GitHub`}
              >
                Code ↗
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live site`}
              >
                Live ↗
              </a>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
