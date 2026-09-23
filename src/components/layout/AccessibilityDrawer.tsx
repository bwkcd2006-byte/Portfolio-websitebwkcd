import React, { useEffect, useRef } from 'react';
import { X, Sun, Moon, Contrast, ZoomIn, Eye, Sparkles, Volume2, Move, RotateCcw } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const AccessibilityDrawer: React.FC = () => {
  const { isA11yDrawerOpen, setIsA11yDrawerOpen, settings, updateSetting, resetSettings, announce } = useAccessibility();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap & ESC key handling
  useEffect(() => {
    if (!isA11yDrawerOpen) return;

    announce('Accessibility preferences drawer opened. Press Escape to close.');

    // Shift focus to close button
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsA11yDrawerOpen(false);
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isA11yDrawerOpen, setIsA11yDrawerOpen, announce]);

  if (!isA11yDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity"
      aria-hidden="false"
      onClick={() => setIsA11yDrawerOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="w-screen max-w-md bg-neutral-50 p-6 shadow-2xl border-l border-neutral-300 dark:bg-neutral-900 dark:border-neutral-800 transition-all flex flex-col justify-between overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <div>
                <h2 id="a11y-panel-title" className="text-lg font-bold text-neutral-950 dark:text-white font-display">
                  Accessibility Preferences
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Conforms with WCAG 2.2 AAA standard adjustments
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsA11yDrawerOpen(false)}
                aria-label="Close accessibility preferences"
                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950 focus-visible:outline-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:dark:text-neutral-100 dark:focus-visible:outline-amber-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="mt-6 space-y-6 text-sm text-neutral-800 dark:text-neutral-200">
              {/* Color Mode & Contrast */}
              <fieldset className="space-y-2">
                <legend className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Contrast className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Color Scheme & Contrast Mode
                </legend>
                <div className="grid grid-cols-3 gap-2 pt-1" role="radiogroup" aria-label="Color scheme options">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.theme === 'light'}
                    onClick={() => updateSetting('theme', 'light')}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all ${
                      settings.theme === 'light'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold shadow-xs'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Sun className="h-4 w-4" aria-hidden="true" />
                    <span>Light (AA)</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.theme === 'dark'}
                    onClick={() => updateSetting('theme', 'dark')}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all ${
                      settings.theme === 'dark'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold shadow-xs'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Moon className="h-4 w-4" aria-hidden="true" />
                    <span>Dark (AA)</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.theme === 'high-contrast'}
                    onClick={() => updateSetting('theme', 'high-contrast')}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all ${
                      settings.theme === 'high-contrast'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold shadow-xs'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>Stark (AAA)</span>
                  </button>
                </div>
              </fieldset>

              {/* Font Size Scaling */}
              <fieldset className="space-y-2">
                <legend className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <ZoomIn className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  Text Size Scaling
                </legend>
                <div className="grid grid-cols-3 gap-2 pt-1" role="radiogroup" aria-label="Text size scale options">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.fontSize === 'normal'}
                    onClick={() => updateSetting('fontSize', 'normal')}
                    className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                      settings.fontSize === 'normal'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    Standard (100%)
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.fontSize === 'large'}
                    onClick={() => updateSetting('fontSize', 'large')}
                    className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                      settings.fontSize === 'large'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    Large (115%)
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={settings.fontSize === 'x-large'}
                    onClick={() => updateSetting('fontSize', 'x-large')}
                    className={`rounded-lg border p-2.5 text-xs font-medium transition-all ${
                      settings.fontSize === 'x-large'
                        ? 'border-neutral-950 bg-neutral-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-neutral-950 font-bold'
                        : 'border-neutral-300 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    Max (130%)
                  </button>
                </div>
              </fieldset>

              {/* Toggles */}
              <div className="space-y-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                {/* Atkinson Hyperlegible Font */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                      Dyslexia-Friendly Typeface
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      Enables Braille Institute Atkinson Hyperlegible font
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.hyperlegibleFont}
                    onChange={(e) => updateSetting('hyperlegibleFont', e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                  />
                </label>

                {/* Enhanced Focus Ring */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                      Ultra-Visible Focus Indicator
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      Bold 4px high-contrast outline for keyboard navigation
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enhancedFocus}
                    onChange={(e) => updateSetting('enhancedFocus', e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                  />
                </label>

                {/* Reading Ruler */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">
                      Focus Reading Guide Band
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      Horizontal guide overlay tracking reading position
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.readingRuler}
                    onChange={(e) => updateSetting('readingRuler', e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                  />
                </label>

                {/* Reduced Motion */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block flex items-center gap-1.5">
                      <Move className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                      Reduced Motion Override
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      Disables all animated transitions and smooth scrolling
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                  />
                </label>

                {/* Screen Reader Live Announcements */}
                <label className="flex items-center justify-between gap-3 cursor-pointer py-1">
                  <div>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block flex items-center gap-1.5">
                      <Volume2 className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                      Assistive Live Region Updates
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                      Pushes dynamic state announcements via ARIA live regions
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.announcementsEnabled}
                    onChange={(e) => updateSetting('announcementsEnabled', e.target.checked)}
                    className="h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Footer Reset button */}
          <div className="mt-8 border-t border-neutral-200 pt-4 dark:border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={resetSettings}
              className="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset All to Defaults
            </button>

            <button
              type="button"
              onClick={() => setIsA11yDrawerOpen(false)}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
            >
              Apply & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
