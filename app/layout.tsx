import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  title: 'Muhammad Suleman — Full Stack Developer',
  description:
    'Full Stack Developer specialising in React, Next.js, Node.js & Golang. Building fast, scalable, and beautiful digital experiences.',
  keywords: ['Muhammad Suleman', 'Full Stack Developer', 'React', 'Next.js', 'Golang', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Muhammad Suleman' }],
  openGraph: {
    title: 'Muhammad Suleman — Full Stack Developer',
    description: 'Full Stack Developer specialising in React, Next.js, Node.js & Golang.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
