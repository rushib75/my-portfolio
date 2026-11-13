import { lazy, Suspense } from 'react';
import { Footer, Navbar } from './Chrome';
import { About, CaseStudies, Contact, Hero, ProblemSolution, Roi, Services } from './Sections';
import { Section } from './ui';

// recharts is the heaviest dependency, so it loads after the hero has painted.
const Dashboards = lazy(() => import('./Dashboards'));

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only rounded-md bg-primary px-4 py-2 text-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<Section id="dashboards"><div className="h-[520px] animate-pulse rounded-xl bg-surface-2" /></Section>}>
          <Dashboards />
        </Suspense>
        <ProblemSolution />
        <Services />
        <CaseStudies />
        <Roi />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
