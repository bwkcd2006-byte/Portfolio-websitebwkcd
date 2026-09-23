import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ShieldAlert, Award, FileCode2 } from 'lucide-react';
import { Project } from '../../types/portfolio';
import { useAccessibility } from '../../context/AccessibilityContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { announce } = useAccessibility();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    announce(`Opened case study for ${project.title}. Press Escape to close modal.`);
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          lastEl?.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          firstEl?.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, announce]);

  if (!project) return null;

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
        aria-labelledby="project-modal-title"
        className="relative my-8 w-full max-w-4xl rounded-2xl border border-neutral-300 bg-neutral-50 p-6 shadow-2xl transition-all sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <time>{project.period}</time>
              <span aria-hidden="true">·</span>
              <span>{project.clientOrOrg}</span>
            </div>
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 font-serif-display text-lg italic">
              {project.subtitle}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details modal"
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-950 focus-visible:outline-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:dark:text-neutral-100 dark:focus-visible:outline-amber-400"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="mt-6 space-y-8 max-h-[70vh] overflow-y-auto pr-2">
          {/* Main Visual Frame */}
          <figure className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950">
            <img
              src={project.thumbnail}
              alt={`Detailed visual architecture interface for ${project.title}`}
              className="h-64 sm:h-80 w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <figcaption className="p-3 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <span>Production interface architecture capture</span>
              <span className="font-mono">WCAG Level: {project.audit.wcagLevel} Tested</span>
            </figcaption>
          </figure>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-800/60"
              >
                <div className="text-2xl font-bold text-neutral-950 dark:text-amber-400 font-mono tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-800/40">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-500" aria-hidden="true" />
                The Problem & Structural Challenge
              </h3>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.challenge}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-800/40">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                The Architectural Solution
              </h3>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Accessibility Standards Applied */}
          <div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-3 flex items-center gap-2 font-display">
              <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
              WCAG 2.2 AAA Accessibility Implementation Details
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.accessibilityFeatures.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/40 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Audit Scorecard */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
              Independent Accessibility Audit Telemetry
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block">Overall Score</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {project.audit.score} / 100
                </span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block">Min Contrast Ratio</span>
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {project.audit.contrastRatio}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block">Screen Readers Tested</span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {project.audit.screenReaderTested.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block">ARIA Compliance</span>
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {project.audit.ariaComplianceRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <figure className="border-l-4 border-amber-500 bg-amber-50/50 p-4 dark:bg-amber-950/20 dark:border-amber-400 rounded-r-xl">
              <blockquote className="text-sm italic text-neutral-800 dark:text-neutral-200">
                "{project.testimonial.quote}"
              </blockquote>
              <figcaption className="mt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                — {project.testimonial.author}, {project.testimonial.role} ({project.testimonial.organization})
              </figcaption>
            </figure>
          )}

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-mono text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
