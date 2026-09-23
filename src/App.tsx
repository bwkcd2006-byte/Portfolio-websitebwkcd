import React from 'react';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { SkipLink } from './components/layout/SkipLink';
import { LiveAnnouncer } from './components/layout/LiveAnnouncer';
import { ReadingRuler } from './components/layout/ReadingRuler';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AccessibilityDrawer } from './components/layout/AccessibilityDrawer';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { ResumeModal } from './components/about/ResumeModal';

import { HomePage } from './components/pages/HomePage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { AboutPage } from './components/pages/AboutPage';
import { A11yLabPage } from './components/pages/A11yLabPage';
import { WritingPage } from './components/pages/WritingPage';
import { ContactPage } from './components/pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage, selectedProject, setSelectedProject, isResumeModalOpen, setIsResumeModalOpen } = useAccessibility();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <AboutPage />;
      case 'a11y-lab':
        return <A11yLabPage />;
      case 'writing':
        return <WritingPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-50 selection:bg-amber-400 selection:text-neutral-950">
      {/* 1. Accessible Skip to Main Content Link (WCAG 2.4.1) */}
      <SkipLink />

      {/* 2. ARIA Live Regions for Assistive Technology Announcements (WCAG 4.1.3) */}
      <LiveAnnouncer />

      {/* 3. Optional Reading Ruler Guide for Cognitive Focus */}
      <ReadingRuler />

      {/* 4. Top Navigation Bar (Strict 3-Zone Top Bar Contract) */}
      <Header />

      {/* 5. Semantic Main Landmark with Skip-link Focus Target */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none"
      >
        {renderPage()}
      </main>

      {/* 6. Semantic Footer Landmark */}
      <Footer />

      {/* 7. Accessibility Preferences Slide-Over Modal */}
      <AccessibilityDrawer />

      {/* 8. Detailed Project Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          // Clean up hash if needed
          if (window.location.hash.startsWith('#project-')) {
            window.location.hash = 'projects';
          }
        }}
      />

      {/* 9. Accessible Curriculum Vitae Sheet Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
