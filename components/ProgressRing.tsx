'use client';
export default function ProgressRing() {
  return (
    <div id="progress-ring" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle className="track" cx="26" cy="26" r="22" />
        <circle className="progress-fill" cx="26" cy="26" r="22" id="ringCircle" />
      </svg>
      <div className="ring-inner">↑</div>
    </div>
  );
}
