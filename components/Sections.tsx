import { Fragment } from 'react';
import {
  ACHIEVEMENTS,
  ARCHIVE_PROJECTS,
  CVS,
  EDUCATION,
  EXPERIENCES,
  PERSONAL,
  PROJECTS,
  SELECTED_PROJECTS,
  SKILLS,
  STATS,
  SUMMARY,
} from '@/data';
import CopyEmail from './CopyEmail';
import { ProjectLink } from './ProjectDialog';
import { SectionHead } from './Sheet';

const hasUrl = (u: string) => Boolean(u) && u !== '#';
const handle = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '');

export function ResumeHeader() {
  return (
    <header id="top" className="cv-head">
      <h1 className="cv-name" data-intro="name">
        {PERSONAL.name}
      </h1>
      <p className="cv-role" data-intro="line">
        {PERSONAL.role}
        <span className="muted"> — React · Next.js · TypeScript</span>
      </p>
      <ul className="cv-contact" data-intro="line">
        <li>
          <a href={`tel:${PERSONAL.phone.replace(/-/g, '')}`}>{PERSONAL.phone}</a>
        </li>
        <li>
          <a href={`mailto:${PERSONAL.email}`}>{PERSONAL.email}</a>
        </li>
        <li>
          <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>{PERSONAL.location}</li>
      </ul>
      <div className="rule rule--heavy" data-intro="line" />
      <p className="cv-status mono" data-intro="line">
        <span className="dot" aria-hidden="true" /> Open to full-time and contract roles, remote or on-site
      </p>
    </header>
  );
}

export function Summary() {
  return (
    <>
      <SectionHead id="summary" n={1} title="Professional Summary" />
      <p className="cv-summary" data-reveal>
        {SUMMARY.map((s, i) =>
          s.mark ? (
            <mark key={i} className="hl" data-hl>
              {s.text}
            </mark>
          ) : (
            <Fragment key={i}>{s.text}</Fragment>
          ),
        )}
      </p>
      <dl className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat" data-reveal>
            <dt className="mono">{s.label}</dt>
            <dd>
              <span data-count={s.value}>{s.value}</span>
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function Experience() {
  return (
    <>
      <SectionHead id="experience" n={2} title="Professional Experience" />
      <div className="roles">
        <span className="roles-track" data-track aria-hidden="true" />
        {EXPERIENCES.map((e) => (
          <article key={e.company} className="role" data-reveal>
            <div className="entry-top">
              <h3 className="entry-title">{e.role}</h3>
              <span className="entry-date mono">{e.period}</span>
            </div>
            <p className="entry-sub">
              {e.company} — {e.location}
            </p>
            <ul className="bullets">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            {e.projects && (
              <p className="role-work">
                <span className="mono muted">Shipped here</span>
                {e.projects.map((id) => {
                  const p = PROJECTS.find((x) => x.id === id)!;
                  return (
                    <ProjectLink key={id} id={id} className="chip">
                      {p.title.split(' — ')[0]} <span aria-hidden="true">↗</span>
                    </ProjectLink>
                  );
                })}
              </p>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export function Projects() {
  return (
    <>
      <SectionHead id="projects" n={3} title="Selected Projects" />
      <p className="sec-note muted" data-reveal>
        Every entry opens a case sheet with the full scope, architecture notes and links.
      </p>
      <div className="projects">
        {SELECTED_PROJECTS.map((p, i) => {
          const [name, subtitle] = p.title.split(' — ');
          return (
            <article key={p.id} className="proj" data-reveal>
              <h3 className="proj-head">
                <ProjectLink id={p.id} className="proj-btn">
                  <span className="proj-no mono">P.{String(i + 1).padStart(2, '0')}</span>
                  <span className="proj-name">
                    <span className="hl-hover">{name}</span>
                    {subtitle && <span className="proj-sub"> — {subtitle}</span>}
                  </span>
                  <span className="proj-open mono" aria-hidden="true">
                    Case sheet →
                  </span>
                </ProjectLink>
              </h3>
              <p className="proj-meta">
                <span>{p.tech.join(', ')}</span>
                {hasUrl(p.githubUrl) && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                )}
                {hasUrl(p.liveUrl) && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live
                  </a>
                )}
              </p>
              <ul className="bullets">
                {(p.cv ?? p.highlights.slice(0, 2)).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <h3 className="sub-head" data-reveal>
        Also built
      </h3>
      <ul className="index">
        {ARCHIVE_PROJECTS.map((p) => (
          <li key={p.id} data-reveal>
            <ProjectLink id={p.id} className="index-row">
              <span className="index-name">{p.title.split(' — ')[0]}</span>
              <span className="index-leader" aria-hidden="true" />
              <span className="index-tag mono">{p.tag}</span>
              <span className="index-arrow" aria-hidden="true">
                →
              </span>
            </ProjectLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Skills() {
  return (
    <>
      <SectionHead id="skills" n={4} title="Technical Skills" />
      <dl className="skills">
        {SKILLS.map((s) => (
          <div key={s.label} className="skill-row" data-reveal>
            <dt>{s.label}</dt>
            <dd>
              {s.items.map((it, i) => (
                <Fragment key={it}>
                  {i > 0 && ' '}
                  <span className="skill">{it}</span>
                </Fragment>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function Education() {
  return (
    <>
      <SectionHead id="education" n={5} title="Education & Achievements" />
      <article className="role" data-reveal>
        <div className="entry-top">
          <h3 className="entry-title">{EDUCATION.degree}</h3>
          <span className="entry-date mono">{EDUCATION.period}</span>
        </div>
        <p className="entry-sub">
          {EDUCATION.school} · GPA {EDUCATION.gpa}
        </p>
      </article>
      <ul className="bullets awards" data-reveal>
        {ACHIEVEMENTS.map((a) => (
          <li key={a.title}>
            <span>
              <strong>{a.title}</strong>, {a.where}
            </span>
            {a.year && <span className="entry-date mono">{a.year}</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Contact() {
  return (
    <>
      <SectionHead id="contact" n={6} title="References & Contact" />
      <p className="ct-lede" data-reveal>
        References available on request. Better yet,{' '}
        <mark className="hl" data-hl>
          let&apos;s talk about what you&apos;re building.
        </mark>
      </p>
      <div className="ct-mail-row" data-reveal>
        <a className="ct-mail" href={`mailto:${PERSONAL.email}`}>
          {PERSONAL.email}
        </a>
        <CopyEmail email={PERSONAL.email} />
      </div>
      <dl className="ct-grid" data-reveal>
        <div>
          <dt className="mono">LinkedIn</dt>
          <dd>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
              {handle(PERSONAL.linkedin)}
            </a>
          </dd>
        </div>
        <div>
          <dt className="mono">GitHub</dt>
          <dd>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
              {handle(PERSONAL.github)}
            </a>
          </dd>
        </div>
        <div>
          <dt className="mono">Phone</dt>
          <dd>
            <a href={`tel:${PERSONAL.phone.replace(/-/g, '')}`}>{PERSONAL.phone}</a>
          </dd>
        </div>
        <div>
          <dt className="mono">Based in</dt>
          <dd>{PERSONAL.location} · PKT, UTC+5</dd>
        </div>
      </dl>
      <div className="ct-cvs" data-reveal>
        <span className="mono muted">Take a copy</span>
        {CVS.map((cv) => (
          <a key={cv.href} className="btn btn--sm" href={cv.href} download>
            {cv.label} CV ↓
          </a>
        ))}
      </div>
    </>
  );
}
