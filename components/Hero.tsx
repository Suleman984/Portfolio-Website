'use client';
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-noise" />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <div className="eyebrow-dot" />
          <span className="eyebrow-text">Available for opportunities</span>
        </div>
        <h1 className="hero-title" id="heroTitle">
          <span className="title-line">
            <span className="title-word" id="hw1">Hi,&nbsp;</span>
            <span className="title-word" id="hw2">I&apos;m</span>
          </span>
          <span className="title-line">
            <span className="title-word grad" id="hw3">Muhammad</span>
          </span>
          <span className="title-line">
            <span className="title-word grad" id="hw4">Suleman</span>
          </span>
        </h1>
        <div className="hero-roles">
          <span className="role-prefix">I&apos;m a</span>
          <span className="role-typed" id="roleTyped" />
        </div>
        <p className="hero-sub">
          <strong>Full Stack Developer</strong> building exceptional digital experiences.<br />
          Specialising in <strong>React</strong>, <strong>Next.js</strong>, <strong>Node.js</strong> &amp; <strong>Golang</strong> —<br />
          crafting fast, scalable, and beautiful software.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary"><span>View My Work</span><span>→</span></a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
        <div className="hero-scroll">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </div>
      <div className="hero-badge-float" id="heroBadge">
        <div className="badge-ring">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="circle-path" d="M80,80 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none"/>
            <text fill="rgba(124,109,250,.6)" fontFamily="Syne" fontSize="11" fontWeight="700" letterSpacing="6">
              <textPath href="#circle-path">FULL STACK DEVELOPER • ISLAMABAD • </textPath>
            </text>
          </svg>
          <div className="badge-center">MS<span>2025</span></div>
        </div>
      </div>
    </section>
  );
}
