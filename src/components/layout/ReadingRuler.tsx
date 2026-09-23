import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ReadingRuler: React.FC = () => {
  const { settings } = useAccessibility();
  const [posY, setPosY] = useState(250);

  useEffect(() => {
    if (!settings.readingRuler) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingRuler]);

  if (!settings.readingRuler) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[9990] transition-[top] duration-75 ease-out"
      style={{ top: `${posY - 36}px` }}
      aria-hidden="true"
    >
      <div className="h-[72px] w-full border-y-2 border-amber-400/80 bg-amber-400/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] dark:border-amber-300 dark:bg-amber-300/15 dark:shadow-[0_0_0_9999px_rgba(0,0,0,0.65)]" />
    </div>
  );
};
