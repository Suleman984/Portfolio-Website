'use client';
import { PERSONAL } from '@/data';

export default function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--black2)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '10rem 5vw' }}>
      <div className="sec-tag contact-eyebrow reveal-up" style={{ justifyContent: 'center' }}>Get In Touch</div>

      <h2 className="contact-title reveal-up">
        Let&apos;s build<br />
        <span className="grad-text">something<br />great</span>
      </h2>

      <p className="contact-sub reveal-up">
        Open to full-time roles, freelance projects, and collaborations.<br />
        I&apos;d love to hear about what you&apos;re building.
      </p>

      <div className="contact-cards reveal-up">
        <a href={`mailto:${PERSONAL.email}`} className="ccard">
          <div className="ccard-icon">✉️</div><span>{PERSONAL.email}</span>
        </a>
        <a href={`tel:${PERSONAL.phone.replace(/[^+\d]/g, '')}`} className="ccard">
          <div className="ccard-icon">📱</div><span>{PERSONAL.phone}</span>
        </a>
        <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="ccard">
          <div className="ccard-icon">💼</div><span>LinkedIn</span>
        </a>
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="ccard">
          <div className="ccard-icon">🌐</div><span>GitHub</span>
        </a>
      </div>

      <a href={`mailto:${PERSONAL.email}`} className="btn-primary reveal-up">
        <span>Send a Message</span><span>✉</span>
      </a>
    </section>
  );
}
