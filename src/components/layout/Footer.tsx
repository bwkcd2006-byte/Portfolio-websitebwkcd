import React, { useState, useEffect } from 'react';
import { ArrowUp, Heart, ShieldCheck, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROFILE } from '../../data/portfolioData';
import { PageId } from '../../types/portfolio';

export const Footer: React.FC = () => {
  const { setCurrentPage, setIsA11yDrawerOpen } = useAccessibility();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to SF time
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setTimeStr(`${formatted} PT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainHeading = document.querySelector('main h1, main h2') as HTMLElement | null;
    mainHeading?.focus();
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home Overview' },
    { id: 'projects', label: 'Selected Works' },
    { id: 'about', label: 'About & Philosophy' },
    { id: 'a11y-lab', label: 'Interactive A11y Lab' },
    { id: 'writing', label: 'Technical Writing' },
    { id: 'contact', label: 'Contact & Booking' },
  ];

  return (
    <footer
      role="contentinfo"
      className="border-t border-neutral-200 bg-neutral-100 text-neutral-800 transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Col 1: Bio & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-bold font-display tracking-tight text-neutral-950 dark:text-white block">
              {PROFILE.name}
            </span>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Staff Accessibility Engineer & Creative Technologist dedicated to building an inclusive, zero-barrier web.
              Conforming with WCAG 2.2 AAA guidelines and modern semantic HTML5 standards.
            </p>

            {/* Timezone & Availability */}
            <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                <span>Available for staff advisory, design system audits & keynote speaking</span>
              </div>
              <p className="font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                Location: San Francisco, CA · Local Time: {timeStr || 'Loading...'}
              </p>
            </div>
          </div>

          {/* Col 2: Semantic Sitemap Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Navigation
            </h3>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(link.id, true);
                      }}
                      className="hover:text-neutral-950 hover:underline dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Direct Connect & Standards */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Connect & Standards
            </h3>
            <address className="not-italic text-sm space-y-2.5">
              <div>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 hover:text-neutral-950 dark:hover:text-amber-400"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{PROFILE.email}</span>
                </a>
              </div>
              <div>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-neutral-950 dark:hover:text-amber-400"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </div>
              <div>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-neutral-950 dark:hover:text-amber-400"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </div>
            </address>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsA11yDrawerOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:underline dark:text-amber-400"
              >
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>Review Accessibility Conformance Statement</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row dark:border-neutral-800 dark:text-neutral-400">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {PROFILE.name}. Crafted with universal access in mind.</span>
          </p>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline">WCAG 2.2 Level AAA Compliant</span>
            <a
              href="#main-content"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 font-semibold text-neutral-900 hover:underline dark:text-neutral-100"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
