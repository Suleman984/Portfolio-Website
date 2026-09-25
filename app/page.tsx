import ClientChrome from '@/components/ClientChrome';
import { ProjectDialogProvider } from '@/components/ProjectDialog';
import { Contact, Education, Experience, Projects, ResumeHeader, Skills, Summary } from '@/components/Sections';
import { Sheet } from '@/components/Sheet';
import Toolbar from '@/components/Toolbar';

export default function Home() {
  return (
    <>
      <ClientChrome />
      <Toolbar />
      <ProjectDialogProvider>
        <main className="desk">
          <Sheet page={1} intro>
            <ResumeHeader />
            <Summary />
            <Experience />
          </Sheet>
          <Sheet page={2}>
            <Projects />
          </Sheet>
          <Sheet page={3}>
            <Skills />
            <Education />
            <Contact />
          </Sheet>
        </main>
      </ProjectDialogProvider>
      <footer className="colophon mono">
        <p>Set in Inter Tight &amp; Inter. Built with Next.js, GSAP, Lenis and three.js.</p>
        <p>
          Press <kbd>⌘</kbd> <kbd>P</kbd> for a paper copy.
        </p>
      </footer>
    </>
  );
}
