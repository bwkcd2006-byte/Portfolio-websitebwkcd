import React, { useEffect, useRef } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROFILE, EXPERIENCES, CERTIFICATIONS, SKILL_CATEGORIES } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { announce } = useAccessibility();
  const modalRef = useRef<HTMLDivElement>(null);
  const printBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    announce('Opened Accessible Curriculum Vitae view. Press Escape to close.');
    printBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, announce]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative my-8 w-full max-w-4xl rounded-2xl border border-neutral-300 bg-white p-6 shadow-2xl transition-all sm:p-10 dark:border-neutral-800 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar (Screen only, hidden when printing) */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800 no-print">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Accessible Curriculum Vitae · Screen-Reader Optimized
          </span>
          <div className="flex items-center gap-2">
            <button
              ref={printBtnRef}
              type="button"
              onClick={handlePrint}
              aria-label="Print or save as PDF"
              className="flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume view"
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="mt-6 space-y-8 max-h-[75vh] overflow-y-auto pr-3">
          {/* Header */}
          <header className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
            <h2 id="resume-modal-title" className="text-3xl font-bold font-display tracking-tight text-neutral-950 dark:text-white">
              {PROFILE.name}
            </h2>
            <p className="mt-1 text-base font-medium text-amber-700 dark:text-amber-400">
              {PROFILE.title}
            </p>
            <address className="not-italic mt-3 flex flex-wrap gap-4 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
                {PROFILE.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
                {PROFILE.email}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
                https://elena-vance.dev
              </span>
            </address>
          </header>

          {/* Executive Summary */}
          <section aria-labelledby="resume-summary">
            <h3 id="resume-summary" className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-2">
              Executive Summary
            </h3>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {PROFILE.bio}
            </p>
          </section>

          {/* Work Experience */}
          <section aria-labelledby="resume-experience">
            <h3 id="resume-experience" className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-4 border-b border-neutral-200 pb-1 dark:border-neutral-800">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <article key={exp.id} className="space-y-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                      {exp.role} <span className="font-normal text-neutral-600 dark:text-neutral-400">at {exp.company}</span>
                    </h4>
                    <time className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                      {exp.period}
                    </time>
                  </div>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {exp.location}
                  </p>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {exp.description}
                  </p>
                  <ul className="space-y-1 pt-1 text-sm text-neutral-700 dark:text-neutral-300">
                    {exp.keyOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 select-none">▸</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Credentials & Certifications */}
          <section aria-labelledby="resume-certifications">
            <h3 id="resume-certifications" className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3 border-b border-neutral-200 pb-1 dark:border-neutral-800">
              Accessibility Certifications & Standards Appointments
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {cert.issuer} · <span className="font-mono">{cert.issuedYear}</span>
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Technical Matrix */}
          <section aria-labelledby="resume-skills">
            <h3 id="resume-skills" className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 mb-3 border-b border-neutral-200 pb-1 dark:border-neutral-800">
              Core Technical Competencies
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {cat.name}
                  </h4>
                  <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                    {cat.skills.map((skill) => (
                      <li key={skill}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
