'use client';
export default function Navbar() {
  return (
    <nav id="nav">
      <a href="#hero" className="nav-logo">
        <span className="logo-bracket">[</span>MS<span className="logo-bracket">]</span>
      </a>
      <ul className="nav-links">
        {['about','skills','experience','projects','contact'].map(s => (
          <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
        ))}
      </ul>
      <a href="mailto:sulemanefc@gmail.com" className="nav-cta"><span>Hire Me →</span></a>
      <button className="ham-btn" id="hamBtn" aria-label="Menu">
        <div className="ham-line" /><div className="ham-line" /><div className="ham-line" />
      </button>
    </nav>
  );
}
