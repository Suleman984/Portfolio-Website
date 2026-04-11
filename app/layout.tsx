import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Suleman — Full Stack Developer',
  description: 'Full Stack Developer specialising in React, Next.js, Node.js & Golang. Building fast, scalable, and beautiful digital experiences.',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
