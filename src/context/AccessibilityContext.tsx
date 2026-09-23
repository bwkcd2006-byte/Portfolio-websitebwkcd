import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AccessibilitySettings, PageId, Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
  currentPage: PageId;
  setCurrentPage: (page: PageId, shouldFocusHeading?: boolean) => void;
  announcement: { message: string; politeness: 'polite' | 'assertive'; id: number } | null;
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  isA11yDrawerOpen: boolean;
  setIsA11yDrawerOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  theme: 'dark',
  fontSize: 'normal',
  hyperlegibleFont: false,
  enhancedFocus: false,
  reducedMotion: false,
  announcementsEnabled: true,
  readingRuler: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('elena_portfolio_a11y_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [currentPage, setCurrentPageState] = useState<PageId>('home');
  const [announcement, setAnnouncement] = useState<{ message: string; politeness: 'polite' | 'assertive'; id: number } | null>(null);
  const [isA11yDrawerOpen, setIsA11yDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync settings to localStorage and HTML root classes
  useEffect(() => {
    try {
      localStorage.setItem('elena_portfolio_a11y_settings', JSON.stringify(settings));
    } catch {
      // Ignore
    }

    const root = document.documentElement;

    // Theme class
    root.classList.remove('dark', 'high-contrast-mode');
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'high-contrast') {
      root.classList.add('dark', 'high-contrast-mode');
    }

    // Font size scaling
    root.classList.remove('text-base', 'text-lg', 'text-xl');
    if (settings.fontSize === 'normal') {
      root.style.fontSize = '16px';
    } else if (settings.fontSize === 'large') {
      root.style.fontSize = '18px';
    } else if (settings.fontSize === 'x-large') {
      root.style.fontSize = '20px';
    }

    // Accessible font
    if (settings.hyperlegibleFont) {
      root.classList.add('font-accessible-mode');
    } else {
      root.classList.remove('font-accessible-mode');
    }

    // Enhanced focus ring
    if (settings.enhancedFocus) {
      root.classList.add('enhanced-focus-mode');
    } else {
      root.classList.remove('enhanced-focus-mode');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('force-reduced-motion');
    } else {
      root.classList.remove('force-reduced-motion');
    }
  }, [settings]);

  // Screen reader announcer
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (!settings.announcementsEnabled) return;
    setAnnouncement({
      message,
      politeness,
      id: Date.now(),
    });
  }, [settings.announcementsEnabled]);

  // Page switcher with URL hash & title management & focus shifting
  const setCurrentPage = useCallback((page: PageId, shouldFocusHeading: boolean = true) => {
    setCurrentPageState(page);
    window.location.hash = page;

    // Update document title dynamically
    const pageTitles: Record<PageId, string> = {
      home: 'Elena Vance — Accessible Systems & Creative Engineering Portfolio',
      projects: 'Selected Works & Case Studies — Elena Vance',
      about: 'About, Manifesto & Experience — Elena Vance',
      'a11y-lab': 'Interactive Accessibility Lab & WCAG Sandbox — Elena Vance',
      writing: 'Essays & Architecture Insights — Elena Vance',
      contact: 'Contact & Collaboration — Elena Vance',
    };
    document.title = pageTitles[page] || 'Elena Vance — Portfolio';

    announce(`Navigated to ${pageTitles[page].split('—')[0].trim()} page`);

    if (shouldFocusHeading) {
      setTimeout(() => {
        const mainHeading = document.querySelector('main h1, main h2') as HTMLElement | null;
        if (mainHeading) {
          mainHeading.setAttribute('tabIndex', '-1');
          mainHeading.focus();
        } else {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.setAttribute('tabIndex', '-1');
            mainContent.focus();
          }
        }
      }, 100);
    }
  }, [announce]);

  // Handle URL hash on initial load and browser history changes
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const validPages: PageId[] = ['home', 'projects', 'about', 'a11y-lab', 'writing', 'contact'];

      if (rawHash.startsWith('project-')) {
        const projectId = rawHash.replace('project-', '');
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          setCurrentPageState('projects');
          return;
        }
      }

      if (validPages.includes(rawHash as PageId)) {
        setCurrentPageState(rawHash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    announce(`Setting ${String(key)} updated to ${String(value)}`);
  }, [announce]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    announce('All accessibility settings have been reset to default values.');
  }, [announce]);

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        currentPage,
        setCurrentPage,
        announcement,
        announce,
        isA11yDrawerOpen,
        setIsA11yDrawerOpen,
        selectedProject,
        setSelectedProject,
        isResumeModalOpen,
        setIsResumeModalOpen,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
