'use client';
import { PERSONAL } from '@/data';

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--black)' }}>
      <div className="about-grid">
        <div className="about-sticky reveal-left">
          <div className="about-card">
            <div className="about-card-header">
              <div className="avatar-hex">MS</div>
              <div>
                <div className="about-name">{PERSONAL.name}</div>
                <div className="about-role">{PERSONAL.role}</div>
              </div>
              <div className="about-status"><div className="status-dot" /> Open to work</div>
            </div>
            <div className="about-card-body">
              {[
                ['📍', PERSONAL.location],
                ['🎓', `${PERSONAL.degree} — IST`],
                ['⭐', `GPA: ${PERSONAL.gpa}`],
                ['✉️', PERSONAL.email],
                ['📱', PERSONAL.phone],
                ['🏆', '1st — Speed Programming 2023'],
              ].map(([icon, text]) => (
                <div key={text} className="info-row">
                  <div className="info-icon">{icon}</div>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="about-right reveal-right">
          <div className="sec-tag">About Me</div>
          <h2 className="sec-title" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Crafting experiences that matter</h2>
          <p>I&apos;m a passionate Full Stack Developer with expertise in both frontend and backend technologies. My journey began during my Bachelor&apos;s in Computer Science at IST, where I explored various technologies across the stack.</p>
          <p>I&apos;ve shipped production applications at three companies — from automation pipelines to ATS platforms and diagnostic management systems. I believe in writing clean, maintainable code that solves real problems efficiently.</p>
          <p>My approach is user-centered — I focus on creating intuitive interfaces and seamless experiences while staying current with the latest industry trends and tools.</p>
          <div className="expertise-grid">
            {[
              { icon: '🎨', title: 'Frontend Dev', desc: 'React, Next.js, TypeScript, Framer Motion, Tailwind' },
              { icon: '⚙️', title: 'Backend Dev', desc: 'Node.js, Golang, GraphQL, REST APIs, JWT Auth' },
              { icon: '🤖', title: 'Automation', desc: 'Versori, workflow automation, API integrations, pipelines' },
              { icon: '📊', title: 'Data & DB', desc: 'PostgreSQL, Supabase, Firebase, MongoDB, Python analytics' },
            ].map(e => (
              <div key={e.title} className="ex-card reveal-scale">
                <div className="ex-icon2">{e.icon}</div>
                <div className="ex-name2">{e.title}</div>
                <div className="ex-desc2">{e.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
