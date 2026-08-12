'use client';

import { useCallback, useEffect, useState } from 'react';
import Background from '@/components/Background';
import Contact from '@/components/Contact';
import Cursor from '@/components/Cursor';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Journey from '@/components/Journey';
import Loader from '@/components/Loader';
import Manifesto from '@/components/Manifesto';
import MobileMenu from '@/components/MobileMenu';
import { MotionProvider } from '@/components/motion';
import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import ProjectModal from '@/components/ProjectModal';
import ScrollProgress from '@/components/ScrollProgress';
import Stack from '@/components/Stack';
import Work from '@/components/Work';
import { PROJECTS, type Project } from '@/data';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const openProjectById = useCallback((id: number) => {
    setOpenProject(PROJECTS.find((p) => p.id === id) ?? null);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      const a = t.closest('a[href^="#"]');
      if (!(a instanceof HTMLAnchorElement)) return;
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
    <MotionProvider>
      <Loader />
      <Cursor />
      <Background />
      <ScrollProgress />

      <Navbar menuOpen={mobileMenuOpen} onMenuToggle={() => setMobileMenuOpen((o) => !o)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <Hero />
        <Manifesto />
        <Work onOpen={openProjectById} />
        <Stack />
        <Journey />
        <Profile />
        <Contact />
      </main>

      <Footer />
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </MotionProvider>
  );
}
