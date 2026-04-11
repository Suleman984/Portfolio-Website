'use client';

import { useState } from 'react';
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
