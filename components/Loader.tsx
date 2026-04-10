'use client';
export default function Loader() {
  return (
    <div id="loader">
      <div className="loader-logo">MS.</div>
      <div className="loader-bar-track">
        <div className="loader-bar" id="lbar" />
      </div>
      <div className="loader-pct" id="lpct">0%</div>
    </div>
  );
}
