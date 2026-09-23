import React from 'react';
import { FileText, Award, CheckCircle2, BookOpen, Globe, Terminal, Sparkles, MapPin, Mail, Calendar } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROFILE, EXPERIENCES, CERTIFICATIONS, SKILL_CATEGORIES } from '../../data/portfolioData';

export const AboutPage: React.FC = () => {
  const { setIsResumeModalOpen, setCurrentPage } = useAccessibility();

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Header & Manifesto */}
      <header className="space-y-4 pt-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
          <span>Biography & Engineering Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-display">
          Building inclusive digital infrastructure with precision and empathy.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          I am Elena Vance, a Staff Accessibility Engineer and Design Technologist based in San Francisco. Over the past decade, I have dedicated my career to tearing down digital barriers across complex cloud tools, design systems, and public civic platforms.
        </p>
      </header>

      {/* 2. Personal Manifesto Section */}
      <section aria-labelledby="manifesto-heading" className="rounded-2xl border border-neutral-200 bg-neutral-100 p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/60">
        <h2 id="manifesto-heading" className="text-xl font-bold text-neutral-950 dark:text-white font-display mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" aria-hidden="true" />
          The Five Non-Negotiables of Accessible Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-bold text-neutral-950 dark:text-white">1. Native Semantics Precede ARIA</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              ARIA is a polyfill for missing semantics, not a replacement for native HTML5 tags. Native buttons, dialogs, and landmarks always provide superior OS-level assistive hookups.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-bold text-neutral-950 dark:text-white">2. Multi-Modal Parity</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Any information conveyed through color must also be reinforced by shape or text; any spatial visualization must offer tabular and auditory sonification pathways.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-bold text-neutral-950 dark:text-white">3. Zero Focus Disorientation</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Dynamic single-page route changes, drawers, and modal dismissals must manage focus return predictably, eliminating lost-focus voids for keyboard navigators.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-bold text-neutral-950 dark:text-white">4. Cognitive Ergonomics & Plain Language</h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Accessibility serves neurodivergent minds, situational fatigue, and language diversity through clear visual hierarchy, plain language summaries, and motion safety.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Career Timeline & Experience */}
      <section aria-labelledby="experience-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
              Professional Trajectory
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              A decade leading accessibility engineering and design system governance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsResumeModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>Open Accessible Resume</span>
          </button>
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <article
              key={exp.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                    {exp.company} <span className="font-normal text-neutral-500 dark:text-neutral-400">· {exp.location}</span>
                  </p>
                </div>
                <time className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                  {exp.period}
                </time>
              </div>

              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {exp.description}
              </p>

              {/* Key outcomes list */}
              <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Key Achievements
                </span>
                <ul className="space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                  {exp.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Credentials, Certifications & Standards */}
      <section aria-labelledby="certifications-heading" className="space-y-6">
        <h2 id="certifications-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
          IAAP Certifications & W3C Appointments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 flex flex-col justify-between"
            >
              <div>
                <Award className="h-6 w-6 text-amber-500 mb-3" aria-hidden="true" />
                <h3 className="text-base font-bold text-neutral-950 dark:text-white">
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {cert.issuer} · <span className="font-mono">{cert.issuedYear}</span>
                </p>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                ID: {cert.verificationId}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Technical Competency Matrix */}
      <section aria-labelledby="skills-heading" className="space-y-6">
        <h2 id="skills-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
          Full Technical Mastery Matrix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-neutral-200 bg-neutral-100/80 p-6 dark:border-neutral-800 dark:bg-neutral-900/40 space-y-4"
            >
              <h3 className="text-base font-bold text-neutral-950 dark:text-white flex items-center gap-2">
                <Terminal className="h-4 w-4 text-amber-500" aria-hidden="true" />
                {category.name}
              </h3>
              <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
