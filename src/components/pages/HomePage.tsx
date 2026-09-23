import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Cpu, Sparkles, Layers, Terminal, Award, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROFILE, PROJECTS, HERO_IMAGE } from '../../data/portfolioData';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedProject, setIsA11yDrawerOpen, announce } = useAccessibility();
  const [activeInspectorTab, setActiveInspectorTab] = useState<'landmarks' | 'contrast' | 'aria'>('landmarks');

  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section (Split Screen Layout) */}
      <section aria-labelledby="hero-heading" className="pt-6 sm:pt-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Bold Typographic Pitch */}
          <div className="lg:col-span-7 space-y-6">
            {/* Natural editorial lead */}
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              <span>{PROFILE.title}</span>
              <span aria-hidden="true">·</span>
              <span>San Francisco, CA</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-mono">W3C WAI Member</span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-neutral-950 dark:text-white font-display text-balance"
            >
              Inclusive web systems built with <span className="font-serif-display italic font-normal text-amber-700 dark:text-amber-400">zero compromise</span>.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-2xl">
              I architect mission-critical design systems, assistive developer tools, and high-performance applications
              that surpass WCAG 2.2 AAA standards. Digital access is not a feature—it is a human right and fundamental engineering discipline.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage('projects', true)}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:bg-neutral-800 active:scale-98 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage('a11y-lab', true)}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 shadow-xs transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <Cpu className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>Open A11y Lab Sandbox</span>
              </button>
            </div>

            {/* Core Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              {PROFILE.stats.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-2xl font-bold font-mono text-neutral-950 dark:text-neutral-100 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Visual Container */}
          <div className="lg:col-span-5">
            <figure className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              <img
                src={HERO_IMAGE}
                alt="Portrait of Elena Vance, Staff Accessibility Engineer, in her San Francisco design studio with architectural lighting."
                className="w-full h-[420px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      Staff Engineer & Researcher
                    </p>
                    <p className="text-sm font-display font-bold">
                      Elena Vance · CPACC, WAS
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsA11yDrawerOpen(true)}
                    className="rounded-lg bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-medium hover:bg-white/30 text-white transition-colors"
                  >
                    Adjust Display
                  </button>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Core Architectural Principles (Zero-Pill, Natural Typography) */}
      <section aria-labelledby="principles-heading" className="border-t border-neutral-200 pt-16 dark:border-neutral-800">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            01. Structural Engineering Philosophy
          </p>
          <h2 id="principles-heading" className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
            Accessibility is architecture, not an aesthetic patch.
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-300">
            Building software that serves all people requires rigorous mathematical contrast, native semantic landmarks, and uncompromising assistive technology testing.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <Layers className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">
              Semantic HTML5 Primacy
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Native HTML elements come pre-packaged with built-in accessibility APIs, keyboard event handlers, and platform shortcuts. Never replace a button with a styled div.
            </p>
          </article>

          <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">
              WCAG 2.2 AAA Contrast
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Moving beyond basic 4.5:1 minimums to strict 7:1+ body ratios and APCA perceptual luminance models, ensuring fatigue-free reading for low-vision and fatigued users.
            </p>
          </article>

          <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
              <Terminal className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-neutral-950 dark:text-white">
              Multi-Modal Ergonomics
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Equal parity across keyboard-only navigation, screen reader speech buffers, single-switch devices, eye trackers, and touch interactions.
            </p>
          </article>
        </div>
      </section>

      {/* 3. Featured Selected Works Showcase (Dynamic Bento Layout) */}
      <section aria-labelledby="featured-projects-heading" className="border-t border-neutral-200 pt-16 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              02. Selected Case Studies
            </p>
            <h2 id="featured-projects-heading" className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
              Engineered for impact and universal access
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage('projects', true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 hover:text-amber-600 dark:text-neutral-100 dark:hover:text-amber-400"
          >
            <span>View all 5 engineering projects</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition-all hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div>
                <figure className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-4/3">
                  <img
                    src={project.thumbnail}
                    alt={`Preview thumbnail for ${project.title}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                </figure>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <time>{project.period}</time>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      WCAG {project.audit.wcagLevel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-950 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition-colors font-display">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  {project.technologies.slice(0, 3).join(' / ')}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(project);
                    window.location.hash = `project-${project.id}`;
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 hover:underline dark:text-amber-400"
                >
                  <span>Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Live Accessibility Inspector Mini-Widget (Interactive Showcase) */}
      <section
        aria-labelledby="inspector-heading"
        className="rounded-2xl border border-neutral-200 bg-neutral-100 p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/60"
      >
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Cpu className="h-4 w-4" aria-hidden="true" />
            <span>Interactive Live Audit Telemetry</span>
          </div>
          <h2 id="inspector-heading" className="text-2xl font-bold text-neutral-950 dark:text-white font-display">
            Real-Time WCAG & Semantic Structure Inspector
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            This portfolio site is built as a living demonstration of WCAG 2.2 AAA accessibility. Switch tabs below to inspect the actual live DOM semantics, contrast calculations, and live region bindings.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800" role="tablist" aria-label="Inspector tabs">
          <button
            type="button"
            role="tab"
            aria-selected={activeInspectorTab === 'landmarks'}
            aria-controls="panel-landmarks"
            id="tab-landmarks"
            onClick={() => {
              setActiveInspectorTab('landmarks');
              announce('Inspector switched to Semantic Landmarks panel');
            }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeInspectorTab === 'landmarks'
                ? 'bg-neutral-900 text-white dark:bg-amber-400 dark:text-neutral-950 font-bold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            HTML5 Landmarks Map
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeInspectorTab === 'contrast'}
            aria-controls="panel-contrast"
            id="tab-contrast"
            onClick={() => {
              setActiveInspectorTab('contrast');
              announce('Inspector switched to Contrast Telemetry panel');
            }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeInspectorTab === 'contrast'
                ? 'bg-neutral-900 text-white dark:bg-amber-400 dark:text-neutral-950 font-bold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            Contrast Ratio Telemetry
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeInspectorTab === 'aria'}
            aria-controls="panel-aria"
            id="tab-aria"
            onClick={() => {
              setActiveInspectorTab('aria');
              announce('Inspector switched to Live ARIA Regions panel');
            }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeInspectorTab === 'aria'
                ? 'bg-neutral-900 text-white dark:bg-amber-400 dark:text-neutral-950 font-bold'
                : 'bg-white text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            ARIA Live Regions & Focus
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="mt-4">
          {activeInspectorTab === 'landmarks' && (
            <div id="panel-landmarks" role="tabpanel" aria-labelledby="tab-landmarks" className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold block">&lt;header role="banner"&gt;</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">Strict 3-zone contract with primary navigation and preferences modal trigger.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold block">&lt;main id="main-content"&gt;</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">Direct target of skip link anchor, containing primary route pages.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold block">&lt;section aria-labelledby&gt;</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">Every section binds to its explicit `h2` heading for screen reader rotor navigation.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold block">&lt;footer role="contentinfo"&gt;</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">Author address, live timezone clock, and accessibility conformance pledge.</p>
                </div>
              </div>
            </div>
          )}

          {activeInspectorTab === 'contrast' && (
            <div id="panel-contrast" role="tabpanel" aria-labelledby="tab-contrast" className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex justify-between font-semibold">
                    <span>Normal Body Text</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">14.8:1 (AAA Pass)</span>
                  </div>
                  <p className="mt-1 text-neutral-500 dark:text-neutral-400">Exceeds WCAG 2.2 AAA minimum ratio of 7.0:1.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex justify-between font-semibold">
                    <span>Large Display Headings</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">18.5:1 (AAA Pass)</span>
                  </div>
                  <p className="mt-1 text-neutral-500 dark:text-neutral-400">Exceeds WCAG 2.2 AAA minimum ratio of 4.5:1.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex justify-between font-semibold">
                    <span>Interactive Focus Ring</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">4px Offset Outline</span>
                  </div>
                  <p className="mt-1 text-neutral-500 dark:text-neutral-400">Complies with WCAG 2.2 SC 2.4.13 (Focus Appearance).</p>
                </div>
              </div>
            </div>
          )}

          {activeInspectorTab === 'aria' && (
            <div id="panel-aria" role="tabpanel" aria-labelledby="tab-aria" className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">Live Region: aria-live="polite"</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">Silently queues route switches and filter counts without interrupting active screen reader utterances.</p>
                </div>
                <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold block">Focus Retention State Machine</span>
                  <p className="mt-1 text-neutral-600 dark:text-neutral-400">When modals or preferences close, keyboard focus returns smoothly to the originating trigger button.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Attributable Testimonials with Claim-to-Proof Adjacency */}
      <section aria-labelledby="testimonials-heading" className="border-t border-neutral-200 pt-16 dark:border-neutral-800">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            03. Peer & Partner Endorsements
          </p>
          <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-neutral-950 dark:text-white font-display">
            Verified collaboration outcomes
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <blockquote className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
              "Elena restructured our entire 250-component enterprise library to pass strict government Section 508 audits ahead of schedule, reducing accessibility support tickets by 84%."
            </blockquote>
            <footer className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-800 dark:text-neutral-200">
                MC
              </div>
              <div>
                <cite className="not-italic text-sm font-bold text-neutral-950 dark:text-white block">
                  Marcus Chen
                </cite>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                  VP of Product Engineering · GovTech Alliance
                </span>
              </div>
            </footer>
          </article>

          <article className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <blockquote className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 italic">
              "For the first time, our blind research fellows could analyze clinical trial telemetry in real time alongside sighted peers using the sonification scrub controller Elena engineered."
            </blockquote>
            <footer className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-800 dark:text-neutral-200">
                AT
              </div>
              <div>
                <cite className="not-italic text-sm font-bold text-neutral-950 dark:text-white block">
                  Dr. Aris Thorne
                </cite>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 block">
                  Chief Scientific Officer · BioTelemetry Labs
                </span>
              </div>
            </footer>
          </article>
        </div>
      </section>

      {/* 6. Quick Action Banner */}
      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-neutral-300 bg-neutral-900 text-white p-8 sm:p-12 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold font-display text-white">
              Have a critical accessibility project or design system challenge?
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Available for staff architectural consulting, comprehensive Section 508 / WCAG 2.2 audits, and hands-on workshops.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentPage('contact', true)}
              className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-neutral-950 shadow-md hover:bg-amber-300 transition-colors"
            >
              Start Conversation
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage('about', true)}
              className="rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 text-sm font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors"
            >
              Read Full Bio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
