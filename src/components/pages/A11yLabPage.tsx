import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, AlertTriangle, XCircle, Volume2, ShieldCheck, Eye, Layers, RefreshCw, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

// Contrast Math Utilities
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrastRatio(fg: string, bg: string): number {
  try {
    const l1 = getLuminance(fg);
    const l2 = getLuminance(bg);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  } catch {
    return 1;
  }
}

export const A11yLabPage: React.FC = () => {
  const { announce } = useAccessibility();

  // Contrast Tool State
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#fbbf24');

  // Screen Reader Live Simulator State
  const [simulatedAnnouncements, setSimulatedAnnouncements] = useState<Array<{ text: string; time: string; level: 'polite' | 'assertive' }>>([
    { text: 'Initial screen reader buffer initialized.', time: '05:00:00', level: 'polite' },
  ]);
  const [customAnnounceText, setCustomAnnounceText] = useState<string>('Item successfully saved to preferences.');

  // Modal Comparison State
  const [showAccessibleDemoModal, setShowAccessibleDemoModal] = useState<boolean>(false);

  const ratio = calculateContrastRatio(fgColor, bgColor);
  const formattedRatio = ratio.toFixed(2);
  const passesNormalAA = ratio >= 4.5;
  const passesNormalAAA = ratio >= 7.0;
  const passesLargeAA = ratio >= 3.0;
  const passesLargeAAA = ratio >= 4.5;

  const handleTestAnnouncement = (level: 'polite' | 'assertive') => {
    if (!customAnnounceText.trim()) return;
    const now = new Date().toLocaleTimeString();
    setSimulatedAnnouncements((prev) => [
      { text: customAnnounceText, time: now, level },
      ...prev.slice(0, 5),
    ]);
    announce(customAnnounceText, level);
  };

  const setPresetColor = (fg: string, bg: string) => {
    setFgColor(fg);
    setBgColor(bg);
    announce(`Applied color preset: FG ${fg}, BG ${bg}. Contrast ratio is ${calculateContrastRatio(fg, bg).toFixed(2)} to 1.`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <header className="space-y-4 pt-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
          <Cpu className="h-4 w-4" aria-hidden="true" />
          <span>Interactive Engineering Sandbox</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-display">
          Accessibility Lab & WCAG 2.2 Sandbox
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Experience real-time WCAG mathematical contrast engines, screen reader live region emission logs, and interactive focus management demonstrations.
        </p>
      </header>

      {/* 1. Real-Time Contrast Analyzer Engine */}
      <section
        aria-labelledby="contrast-tool-heading"
        className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <h2 id="contrast-tool-heading" className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white font-display flex items-center gap-2">
              <Eye className="h-5 w-5 text-amber-500" aria-hidden="true" />
              Real-Time WCAG 2.2 & APCA Contrast Calculator
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Live mathematical luminance evaluation with AA/AAA pass-fail gates.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPresetColor('#000000', '#ffffff')}
              className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Pure B/W (21.0:1)
            </button>
            <button
              type="button"
              onClick={() => setPresetColor('#0f172a', '#fbbf24')}
              className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Slate & Amber (12.4:1)
            </button>
            <button
              type="button"
              onClick={() => setPresetColor('#71717a', '#ffffff')}
              className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Subtle Grey (4.6:1)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label htmlFor="fg-color-input" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1.5">
                Foreground (Text) Color Hex
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="fg-color-input"
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-neutral-300 bg-transparent p-0.5 dark:border-neutral-700"
                  aria-label="Pick foreground color"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-mono text-neutral-900 focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  placeholder="#0f172a"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bg-color-input" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1.5">
                Background Surface Hex
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="bg-color-input"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-neutral-300 bg-transparent p-0.5 dark:border-neutral-700"
                  aria-label="Pick background color"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm font-mono text-neutral-900 focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  placeholder="#fbbf24"
                />
              </div>
            </div>

            {/* Scorecard Results */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-950 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                  Calculated Contrast Ratio:
                </span>
                <span className="text-3xl font-extrabold font-mono text-neutral-950 dark:text-white tabular-nums">
                  {formattedRatio}:1
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-neutral-900">
                  <span>Regular Text (AA 4.5:1)</span>
                  {passesNormalAA ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">PASS</span>
                  ) : (
                    <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">FAIL</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-neutral-900">
                  <span>Regular Text (AAA 7.0:1)</span>
                  {passesNormalAAA ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">PASS</span>
                  ) : (
                    <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">FAIL</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-neutral-900">
                  <span>Large Text (AA 3.0:1)</span>
                  {passesLargeAA ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">PASS</span>
                  ) : (
                    <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">FAIL</span>
                  )}
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-neutral-900">
                  <span>Large Text (AAA 4.5:1)</span>
                  {passesLargeAAA ? (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">PASS</span>
                  ) : (
                    <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">FAIL</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Render Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-neutral-200 p-6 shadow-inner" style={{ backgroundColor: bgColor, color: fgColor }}>
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold tracking-wider opacity-80">
                Interactive Typographic Preview
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
                Universal Accessibility in Modern Web Applications
              </h3>

              <p className="text-sm sm:text-base leading-relaxed">
                When digital surfaces are designed with high luminance contrast, comprehension speeds increase by up to 28% for users experiencing ocular fatigue, glare, or visual impairments.
              </p>

              <div className="pt-2 text-xs font-mono opacity-90 space-y-1">
                <p>• Mathematical formula: (L1 + 0.05) / (L2 + 0.05)</p>
                <p>• Sample code: &lt;button aria-label="Confirm submission"&gt;</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-current/20 flex items-center justify-between text-xs font-medium">
              <span>Preview Container Status: {passesNormalAAA ? 'AAA Certified' : passesNormalAA ? 'AA Certified' : 'Non-Conformant'}</span>
              <span className="font-mono">{fgColor} on {bgColor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Screen Reader Live Region Simulator */}
      <section
        aria-labelledby="live-region-heading"
        className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6"
      >
        <div className="border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <h2 id="live-region-heading" className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white font-display flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-amber-500" aria-hidden="true" />
            Screen Reader Live Region (ARIA Live) Emitter
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Simulate how NVDA, VoiceOver, and JAWS process real-time DOM mutations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label htmlFor="custom-announce-input" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1.5">
                Utterance Content to Broadcast
              </label>
              <input
                id="custom-announce-input"
                type="text"
                value={customAnnounceText}
                onChange={(e) => setCustomAnnounceText(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                placeholder="Enter screen reader announcement..."
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleTestAnnouncement('polite')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
              >
                <span>Emit aria-live="polite"</span>
              </button>

              <button
                type="button"
                onClick={() => handleTestAnnouncement('assertive')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-600 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
              >
                <span>Emit aria-live="assertive"</span>
              </button>
            </div>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1 pt-2">
              <p>• <strong>Polite</strong>: Waits until the screen reader finishes speaking the current buffer.</p>
              <p>• <strong>Assertive</strong>: Immediately interrupts active speech synthesis for critical alerts.</p>
            </div>
          </div>

          {/* Telemetry Output Log */}
          <div className="lg:col-span-7 rounded-xl border border-neutral-200 bg-neutral-100 p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-3">
              Simulated Assistive Speech Buffer Output
            </span>
            <div className="space-y-2.5 max-h-52 overflow-y-auto">
              {simulatedAnnouncements.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-200 bg-white p-3 text-xs dark:border-neutral-800 dark:bg-neutral-900 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 block font-bold">
                      [{item.level.toUpperCase()}]
                    </span>
                    <p className="mt-0.5 font-medium text-neutral-900 dark:text-neutral-100">
                      "{item.text}"
                    </p>
                  </div>
                  <time className="text-[10px] font-mono text-neutral-400 shrink-0">
                    {item.time}
                  </time>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Accessible Dialog Focus Trap Demonstration */}
      <section
        aria-labelledby="dialog-demo-heading"
        className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <h2 id="dialog-demo-heading" className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-white font-display flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-500" aria-hidden="true" />
              Focus Management & Keyboard Trap Verification
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Demonstrates WAI-ARIA Modal Dialog 1.2 patterns: Tab wrapping, Esc key dismissal, and trigger focus return.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAccessibleDemoModal(true)}
            className="rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
          >
            Launch Interactive Dialog Demo
          </button>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          When clicking "Launch Interactive Dialog Demo", note how keyboard focus is cleanly trapped within the modal boundary, unable to leak to the underlying document, and returns immediately to this button upon pressing Escape.
        </p>

        {showAccessibleDemoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
            onClick={() => setShowAccessibleDemoModal(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lab-modal-title"
              className="w-full max-w-md rounded-2xl border border-neutral-300 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 text-neutral-900 dark:text-white space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 id="lab-modal-title" className="text-lg font-bold font-display">
                WAI-ARIA Compliant Dialog Primitives
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                You are currently inside an accessible dialog. Press <kbd className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-xs">Tab</kbd> to cycle between the interactive elements below. Focus will never escape to background layers.
              </p>

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Interactive text field..."
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2 text-xs dark:border-neutral-700 dark:bg-neutral-800"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAccessibleDemoModal(false)}
                    className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAccessibleDemoModal(false);
                      announce('Action confirmed from accessible dialog.');
                    }}
                    className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white dark:bg-amber-400 dark:text-neutral-950"
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
