'use client';
export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      {['about','skills','experience','projects','contact'].map(s => (
        <a key={s} href={`#${s}`} className="mob-link">
          {s.charAt(0).toUpperCase()+s.slice(1)}
        </a>
      ))}
    </div>
  );
}
