import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, ArrowLeft, Bookmark, Share2, Check, ExternalLink } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { ARTICLES } from '../../data/portfolioData';
import { Article } from '../../types/portfolio';

export const WritingPage: React.FC = () => {
  const { announce } = useAccessibility();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    announce(`Reading article: ${article.title}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    announce('Returned to articles index list.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyQuote = (quote: string) => {
    navigator.clipboard.writeText(quote);
    setCopiedQuote(quote);
    announce('Quote copied to clipboard.');
    setTimeout(() => setCopiedQuote(null), 3000);
  };

  return (
    <div className="space-y-12 pb-16">
      {selectedArticle ? (
        /* Full Article Reader View */
        <article aria-labelledby="article-title" className="space-y-8 pt-4">
          <button
            type="button"
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to All Writing</span>
          </button>

          {/* Article Header */}
          <header className="space-y-4 border-b border-neutral-200 pb-8 dark:border-neutral-800">
            {/* Unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span>{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <time>{selectedArticle.publishedAt}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {selectedArticle.readingTimeMinutes} min read
              </span>
            </div>

            <h1 id="article-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 dark:text-white font-display text-balance leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-lg sm:text-xl font-serif-display italic text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
              {selectedArticle.subtitle}
            </p>
          </header>

          {/* Article Content Prose */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Key Takeaways Box */}
              <div className="mt-8 rounded-xl border border-amber-300 bg-amber-50/70 p-6 dark:border-amber-900/60 dark:bg-amber-950/30 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <Bookmark className="h-4 w-4" aria-hidden="true" />
                  Key Engineering Takeaways
                </h3>
                <ul className="space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
                  {selectedArticle.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 dark:text-amber-400 font-bold select-none">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Meta / WCAG Criteria */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-xl border border-neutral-200 bg-neutral-100 p-5 dark:border-neutral-800 dark:bg-neutral-900/60 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  Referenced WCAG 2.2 Criteria
                </h3>
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {selectedArticle.wcagReferences.map((ref, idx) => (
                    <li key={idx} className="p-2 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  Cite This Article
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Vance, Elena. ({selectedArticle.publishedAt.split(' ').pop()}). "{selectedArticle.title}". Inclusive Systems Journal.
                </p>
                <button
                  type="button"
                  onClick={() => handleCopyQuote(selectedArticle.excerpt)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 w-full justify-center"
                >
                  {copiedQuote ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copiedQuote ? 'Excerpt Copied!' : 'Copy Summary Excerpt'}</span>
                </button>
              </div>
            </aside>
          </div>
        </article>
      ) : (
        /* Articles List Overview */
        <>
          <header className="space-y-3 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Technical Journal & Essays
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-display">
              Essays on Standards & Architectural A11y
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              In-depth research on WCAG 2.2 success criteria, screen reader internals, cognitive load reduction, and the hazards of ARIA overuse.
            </p>
          </header>

          <section aria-labelledby="articles-list-heading" className="space-y-6">
            <h2 id="articles-list-heading" className="sr-only">
              Published Technical Essays
            </h2>

            <div className="space-y-6">
              {ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="group rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs transition-all hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <time>{article.publishedAt}</time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {article.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-bold text-neutral-950 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition-colors font-display">
                    {article.title}
                  </h3>

                  <p className="mt-1 text-sm font-serif-display italic text-neutral-600 dark:text-neutral-400">
                    {article.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.wcagReferences.slice(0, 2).map((ref) => (
                        <span key={ref} className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                          {ref}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectArticle(article)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
