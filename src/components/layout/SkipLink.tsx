import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-slate-950 focus:font-semibold focus:shadow-2xl focus:rounded-md focus:outline focus:outline-4 focus:outline-black dark:focus:outline-white"
    >
      Skip to main content
    </a>
  );
};
