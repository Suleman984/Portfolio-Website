'use client';

import { PERSONAL, SERVICES } from '@/data';
import { Reveal, RevealGroup, RevealItem } from './motion';

export default function Profile() {
  const facts: [string, string][] = [
    ['Based in', PERSONAL.location],
    ['Email', PERSONAL.email],
    ['Phone', PERSONAL.phone],
    ['Studied', `${PERSONAL.degree}, ${PERSONAL.university}`],
  ];

  return (
    <section id="profile" className="profile">
      <div className="pf-grid">
        <div className="pf-lead">
          <Reveal>
            <div className="sec-tag">Profile</div>
            <h2 className="pf-title">
              A generalist who
              <br />
              <span className="grad-text">finishes things.</span>
            </h2>
            <p className="pf-copy">
              I started out writing C++ console apps at university and ended up owning production
              systems — Estonian e-commerce at scale, a B2B lead engine, an ATS with a deterministic
              matching engine I wrote in Go because nobody could explain what the LLM was doing.
            </p>
            <p className="pf-copy">
              What I&apos;m good at is the whole line: talking through the requirement, designing the
              schema, building the interface, and being the person who still answers for it once
              it&apos;s live.
            </p>
          </Reveal>

          <RevealGroup className="pf-services" stagger={0.06}>
            {SERVICES.map((s) => (
              <RevealItem key={s.num} className="pf-service">
                <span className="pf-service-num">{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* No parallax here — a transform on this element would become the
            containing block for the sticky card and pin it in place. */}
        <aside className="pf-aside">
          <Reveal className="pf-sticky" from="right">
            <div className="pf-card">
              <div className="pf-avatar">MS</div>
              <div className="pf-identity">
                <strong>{PERSONAL.name}</strong>
                <span>{PERSONAL.role}</span>
              </div>
              <div className="pf-open">
                <span className="pf-open-dot" /> Open to work
              </div>

              <dl className="pf-facts">
                {facts.map(([term, value]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="pf-links">
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
                <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
