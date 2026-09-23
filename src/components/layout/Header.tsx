import React, { useState } from 'react';
import { Sliders, Menu, X } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PageId } from '../../types/portfolio';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, setIsA11yDrawerOpen, settings } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; ariaLabel: string }[] = [
    { id: 'home', label: 'Overview', ariaLabel: 'Go to overview and home page' },
    { id: 'projects', label: 'Selected Works', ariaLabel: 'View engineering projects and case studies' },
    { id: 'about', label: 'About & Experience', ariaLabel: 'Read biography, career timeline and skills' },
    { id: 'a11y-lab', label: 'A11y Lab', ariaLabel: 'Interactive accessibility tools and WCAG sandbox' },
    { id: 'writing', label: 'Writing', ariaLabel: 'Read technical articles and standards essays' },
    { id: 'contact', label: 'Contact', ariaLabel: 'Contact and collaboration details' },
  ];

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId, true);
    setMobileMenuOpen(false);
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-neutral-50/95 backdrop-blur-md transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-950/95"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group inline-flex items-center text-lg font-bold tracking-tight text-neutral-900 transition-colors hover:text-amber-600 focus-visible:outline-2 dark:text-neutral-50 dark:hover:text-amber-400"
          aria-label="Elena Vance — Home"
        >
          <span className="font-display">Elena Vance</span>
        </a>

        {/* Zone 2: Navigation Links (Clean text, no pill badges) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-neutral-950 dark:hover:text-white ${
                  isActive
                    ? 'font-semibold text-neutral-950 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-neutral-900 dark:after:bg-amber-400'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Accessibility Drawer trigger + CTA button) */}
        <div className="flex items-center gap-3">
          {/* Accessibility Settings Trigger */}
          <button
            type="button"
            onClick={() => setIsA11yDrawerOpen(true)}
            aria-label="Open Accessibility and Display Preferences"
            className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 shadow-xs transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:dark:text-neutral-100 dark:focus-visible:outline-amber-400"
          >
            <Sliders className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span className="hidden sm:inline">Preferences</span>
            {settings.theme === 'high-contrast' && (
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-mono font-bold" aria-hidden="true">
                [AAA]
              </span>
            )}
          </button>

          {/* Quick Contact Action */}
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
          >
            Get in Touch
          </button>

          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex md:hidden items-center justify-center rounded-lg p-2 text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="region"
          aria-label="Mobile Navigation Links"
          className="border-b border-neutral-200 bg-neutral-100/98 px-4 py-4 md:hidden dark:border-neutral-800 dark:bg-neutral-900/98"
        >
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-900 text-white dark:bg-amber-400 dark:text-neutral-950 font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono" aria-hidden="true">● Active</span>}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
