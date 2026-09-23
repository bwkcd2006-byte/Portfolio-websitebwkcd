import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';

export const ProjectsPage: React.FC = () => {
  const { setSelectedProject, announce } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Design Systems', 'Data Visualization', 'Assistive Tech', 'Public Infrastructure'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const count = category === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === category).length;
    announce(`Filtered by ${category}. Showing ${count} projects.`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length > 2) {
      announce(`Search updated for ${val}. ${filteredProjects.length} results.`);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <header className="space-y-3 pt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Architecture Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-display">
          Selected Works & Case Studies
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Deep-dive explorations into accessible design systems, WebGL sonification, screen-reader ergonomics, and high-performance digital public goods.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <section aria-labelledby="filter-heading" className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
        <h2 id="filter-heading" className="sr-only">
          Filter and Search Projects
        </h2>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Segmented Category Buttons (Allowed interactive buttons per skill constitution) */}
          <div
            role="tablist"
            aria-label="Filter projects by domain"
            className="flex flex-wrap gap-1.5 p-1 bg-neutral-200/80 rounded-lg dark:bg-neutral-800/80"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-white text-neutral-950 shadow-xs dark:bg-neutral-950 dark:text-amber-400'
                      : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <label htmlFor="project-search-input" className="sr-only">
              Search projects by keyword, technology, or challenge
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            </div>
            <input
              id="project-search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by tech or keyword..."
              className="w-full rounded-lg border border-neutral-300 bg-white py-1.5 pl-9 pr-8 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-amber-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  announce('Search query cleared.');
                }}
                aria-label="Clear search input"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Results summary for assistive tech and visual users */}
        <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <span>
            Showing <strong className="font-mono">{filteredProjects.length}</strong> of{' '}
            <strong className="font-mono">{PROJECTS.length}</strong> verified case studies
          </span>
          {selectedCategory !== 'All' && (
            <span className="font-medium">Category: {selectedCategory}</span>
          )}
        </div>
      </section>

      {/* Projects List Grid */}
      <section aria-labelledby="project-list-heading">
        <h2 id="project-list-heading" className="sr-only">
          Engineering Project Grid
        </h2>

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-800">
            <Filter className="mx-auto h-8 w-8 text-neutral-400" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold text-neutral-900 dark:text-white">
              No matching case studies found
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Try adjusting your search terms or selecting "All" categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-amber-400 dark:text-neutral-950"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-all hover:border-neutral-400 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div>
                  {/* Thumbnail */}
                  <figure className="relative overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-16/9">
                    <img
                      src={project.thumbnail}
                      alt={`Visual architecture snapshot of ${project.title}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </figure>

                  {/* Clean unboxed metadata (NO PILLS per skill instructions) */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <time>{project.period}</time>
                    <span aria-hidden="true">·</span>
                    <span>{project.clientOrOrg}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      WCAG {project.audit.wcagLevel}
                    </span>
                  </div>

                  <h3 className="mt-2 text-2xl font-bold text-neutral-950 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition-colors font-display">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm font-serif-display italic text-neutral-600 dark:text-neutral-400">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Key Metrics row */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-neutral-100 py-3 dark:border-neutral-800 text-xs">
                    {project.metrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="font-mono font-bold text-neutral-900 dark:text-amber-400 block tabular-nums">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block truncate">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      window.location.hash = `project-${project.id}`;
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-neutral-800 dark:bg-amber-400 dark:text-neutral-950 dark:hover:bg-amber-300 transition-all"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
