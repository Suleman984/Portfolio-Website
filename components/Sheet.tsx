import type { ReactNode } from 'react';
import { PERSONAL } from '@/data';

export const TOTAL_PAGES = 3;

/** One sheet of paper on the desk, with the running footer a printed CV has. */
export function Sheet({ page, intro, children }: { page: number; intro?: boolean; children: ReactNode }) {
  return (
    <section className="sheet paper" data-intro={intro ? 'sheet' : undefined} aria-label={`Page ${page}`}>
      {children}
      <footer className="sheet-foot mono">
        <span>
          {PERSONAL.name} — {PERSONAL.role}
        </span>
        <span>
          Page {page} of {TOTAL_PAGES}
        </span>
      </footer>
    </section>
  );
}

export function SectionHead({ id, n, title }: { id: string; n: number; title: string }) {
  return (
    <div className="sec-head" id={id}>
      <div className="sec-row">
        <span className="sec-num mono" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        <h2 className="sec-title" data-split>
          {title}
        </h2>
      </div>
      <div className="rule" data-rule />
    </div>
  );
}
