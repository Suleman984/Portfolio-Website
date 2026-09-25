import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Muhammad Suleman — Software Engineer',
  description:
    'Frontend-focused Software Engineer working in React, Next.js and TypeScript, with Node.js and Go on the backend. Résumé, selected projects and case sheets.',
  keywords: ['Muhammad Suleman', 'Software Engineer', 'Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Golang'],
  authors: [{ name: 'Muhammad Suleman' }],
  openGraph: {
    title: 'Muhammad Suleman — Software Engineer',
    description: 'Frontend-focused Software Engineer working in React, Next.js and TypeScript, with Node.js and Go on the backend.',
    type: 'profile',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e7e3da' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0f11' },
  ],
};

/* Hides page one until the intro can lay it down. Skipped for reduced motion,
   and released on a timer in case scripts never arrive. */
const introScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('intro');setTimeout(function(){d.classList.remove('intro')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
