import React, { useState, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock, Calendar, Download, Copy, Check } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROFILE } from '../../data/portfolioData';

interface FormState {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  consent?: string;
}

export const ContactPage: React.FC = () => {
  const { announce } = useAccessibility();
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    projectType: 'Design System Audit',
    timeline: 'Within 1-2 months',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief description of your project or inquiry.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.';
    }
    if (!formData.consent) {
      errs.consent = 'You must confirm consent to be contacted regarding this inquiry.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      announce(`Form has ${Object.keys(validationErrors).length} errors. Review error summary at the top of the form.`, 'assertive');

      // Move focus to error summary for screen readers & keyboard users
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    announce('Inquiry submitted successfully! Elena Vance will respond within 24 business hours.', 'polite');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    announce('Email address copied to clipboard.');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Vance;Elena;;;
FN:Elena Vance
ORG:Inclusive Systems
TITLE:Staff Accessibility Engineer
EMAIL:${PROFILE.email}
URL:https://elena-vance.dev
NOTE:Staff Accessibility Engineer & Creative Technologist (CPACC, WAS)
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'elena-vance-a11y.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    announce('Elena Vance vCard contact file downloaded.');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <header className="space-y-3 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Inquiries & Collaborations
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-display">
          Let’s build an accessible web together.
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Available for staff engineering engagements, high-stakes Section 508 / WCAG 2.2 AAA audits, custom token engines, and conference speaking.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <section aria-labelledby="form-heading" className="lg:col-span-7">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
            <h2 id="form-heading" className="text-xl font-bold text-neutral-950 dark:text-white font-display mb-1">
              Direct Advisory Inquiry
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              All fields marked with an asterisk (<span className="text-rose-600 dark:text-rose-400 font-bold">*</span>) are strictly required.
            </p>

            {/* Error Summary Banner for WCAG 3.3.1 */}
            {Object.keys(errors).length > 0 && (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="error-summary-title"
                className="mb-6 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 focus:outline-rose-500"
              >
                <h3 id="error-summary-title" className="text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                  There are {Object.keys(errors).length} errors in your submission:
                </h3>
                <ul className="mt-2 space-y-1 text-xs list-disc pl-5">
                  {errors.name && (
                    <li>
                      <a href="#contact-name" className="underline hover:text-rose-950 dark:hover:text-white">
                        {errors.name}
                      </a>
                    </li>
                  )}
                  {errors.email && (
                    <li>
                      <a href="#contact-email" className="underline hover:text-rose-950 dark:hover:text-white">
                        {errors.email}
                      </a>
                    </li>
                  )}
                  {errors.message && (
                    <li>
                      <a href="#contact-message" className="underline hover:text-rose-950 dark:hover:text-white">
                        {errors.message}
                      </a>
                    </li>
                  )}
                  {errors.consent && (
                    <li>
                      <a href="#contact-consent" className="underline hover:text-rose-950 dark:hover:text-white">
                        {errors.consent}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Success State */}
            {isSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950/40 space-y-3"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-100">
                  Inquiry Received
                </h3>
                <p className="text-sm text-emerald-800 dark:text-emerald-200 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Elena Vance will review your project parameters and respond to <strong>{formData.email}</strong> within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      projectType: 'Design System Audit',
                      timeline: 'Within 1-2 months',
                      message: '',
                      consent: false,
                    });
                  }}
                  className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-amber-400 dark:text-neutral-950"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1">
                    Full Name <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                      errors.name
                        ? 'border-rose-500 bg-rose-50/50 text-neutral-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-white'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-900 focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-amber-400'
                    }`}
                    placeholder="Dr. Jordan Reed"
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1">
                    Email Address <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                      errors.email
                        ? 'border-rose-500 bg-rose-50/50 text-neutral-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-white'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-900 focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-amber-400'
                    }`}
                    placeholder="jordan.reed@enterprise.org"
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Project Type & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-type" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1">
                      Engagement Nature
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    >
                      <option value="Design System Audit">Design System & Token Audit</option>
                      <option value="WCAG 2.2 AAA Conformance Review">WCAG 2.2 AAA Remediation</option>
                      <option value="Staff Architecture Advisory">Staff Architecture Advisory</option>
                      <option value="Keynote Speaking & Training">Keynote Speaking & Training</option>
                      <option value="General Collaboration">General Collaboration</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-timeline" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1">
                      Target Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                    >
                      <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
                      <option value="Within 1-2 months">Within 1-2 months</option>
                      <option value="Next Quarter">Next Quarter</option>
                      <option value="Exploratory / Ongoing">Exploratory / Ongoing</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-1">
                    Project Scope & Objectives <span className="text-rose-600 dark:text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'error-message' : 'desc-message'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                      errors.message
                        ? 'border-rose-500 bg-rose-50/50 text-neutral-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-white'
                        : 'border-neutral-300 bg-neutral-50 text-neutral-900 focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-amber-400'
                    }`}
                    placeholder="Share brief details regarding your component framework, compliance targets, or speaking event..."
                  />
                  <p id="desc-message" className="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                    Include technology stack (e.g. React, WebGL) and target compliance level if known.
                  </p>
                  {errors.message && (
                    <p id="error-message" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'error-consent' : undefined}
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-400"
                    />
                    <span className="text-xs text-neutral-700 dark:text-neutral-300">
                      I consent to receiving a direct engineering response from Elena Vance regarding this inquiry. <span className="text-rose-600 dark:text-rose-400">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="error-consent" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white shadow-md hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Sidebar Info Column */}
        <aside aria-labelledby="contact-info-heading" className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
            <h2 id="contact-info-heading" className="text-lg font-bold text-neutral-950 dark:text-white font-display">
              Direct Contact Details
            </h2>

            <address className="not-italic space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    Electronic Mail
                  </span>
                  <a href={`mailto:${PROFILE.email}`} className="font-semibold text-neutral-950 hover:underline dark:text-white block">
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-amber-400"
                  >
                    {copiedEmail ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedEmail ? 'Copied to clipboard' : 'Copy email address'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    Primary Studio & Office
                  </span>
                  <p className="font-semibold text-neutral-950 dark:text-white">
                    San Francisco, California
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Pacific Time Zone (UTC-7) · Remote Worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <Calendar className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                    Consultation Availability
                  </span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Booking Q4 2026 for audits & staff architectural advising.
                  </p>
                </div>
              </div>
            </address>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 py-2.5 text-xs font-bold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download vCard Contact (.vcf)</span>
              </button>
            </div>
          </div>

          {/* Standards Pledge */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-100 p-5 dark:border-neutral-800 dark:bg-neutral-900/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Accessibility Guarantee
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Every deliverable authored by Elena Vance is accompanied by a full VPAT/ACR compliance audit, automated axe telemetry, and screen reader verification videos.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
