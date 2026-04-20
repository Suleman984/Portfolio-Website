'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Marquee from '@/components/Marquee';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProjectModal from '@/components/ProjectModal';
import ProgressRing from '@/components/ProgressRing';
import MobileMenu from '@/components/MobileMenu';
import GSAPInit from '@/components/GSAPInit';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      const a = t.closest('a[href^="#"]');
      if (!a || !(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      window.history.pushState(null, '', href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Loader />
      <Cursor />
      <ThreeBackground />
      <GSAPInit />

      <Navbar menuOpen={mobileMenuOpen} onMenuToggle={() => setMobileMenuOpen((o) => !o)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <ProgressRing />

      <main>
        <Hero />
        <Ticker />
        <Stats />
        <About />
        <Marquee />
        <Skills />
        <Services />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <ProjectModal />
    </>
  );
}
