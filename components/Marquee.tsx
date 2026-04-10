'use client';
const row1 = ['React','Next.js','TypeScript','Golang','Node.js','PostgreSQL','Supabase','GraphQL','Redux','Tailwind','Firebase'];
const row2 = ['Full Stack','Python','C++','Material UI','Storybook','Zustand','MongoDB','REST APIs','SCSS','JWT','Postman'];
const d = (arr: string[]) => [...arr, ...arr];

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="mq-track">
        {d(row1).map((t, i) => <span key={i} className="mq-item">{t}<span className="mq-dot" /></span>)}
      </div>
      <div style={{ height: '.5rem' }} />
      <div className="mq-track reverse">
        {d(row2).map((t, i) => <span key={i} className="mq-item">{t}<span className="mq-dot" /></span>)}
      </div>
    </div>
  );
}
