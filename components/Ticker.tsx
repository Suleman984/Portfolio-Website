'use client';
const items = ['React','Next.js','TypeScript','Golang','Node.js','PostgreSQL','Supabase','GraphQL','Full Stack Dev','Redux Toolkit','Framer Motion'];
const doubled = [...items, ...items];

export default function Ticker() {
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="tick-item">
            {item} <span className="tick-sep">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
