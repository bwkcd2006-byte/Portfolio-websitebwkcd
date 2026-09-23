import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const LiveAnnouncer: React.FC = () => {
  const { announcement } = useAccessibility();

  return (
    <div className="sr-only" aria-hidden="false">
      {/* Polite live region for standard state changes */}
      <div
        id="a11y-status-polite"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement?.politeness === 'polite' ? announcement.message : ''}
      </div>

      {/* Assertive live region for critical errors / warnings */}
      <div
        id="a11y-status-assertive"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {announcement?.politeness === 'assertive' ? announcement.message : ''}
      </div>
    </div>
  );
};
