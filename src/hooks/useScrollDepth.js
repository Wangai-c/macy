/**
 * useScrollDepth.js
 * Tracks the maximum scroll percentage reached on a view.
 */

import { useRef, useEffect, useCallback } from 'react';

const THROTTLE_MS = 200;

/**
 * @param {string} viewKey — identifies which view is currently mounted
 * @returns {{ getMaxScrollPercent: () => number, reset: () => void }}
 */
export function useScrollDepth(viewKey) {
  const maxScrollRef = useRef(0);
  const throttleTimerRef = useRef(null);

  // Reset when viewKey changes
  useEffect(() => {
    maxScrollRef.current = 0;
  }, [viewKey]);

  useEffect(() => {
    const handleScroll = () => {
      if (throttleTimerRef.current) return;

      throttleTimerRef.current = setTimeout(() => {
        throttleTimerRef.current = null;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (fullHeight <= viewportHeight) {
          // No scrollable content — count as 100%
          maxScrollRef.current = 100;
          return;
        }

        const scrollPercent = Math.min(
          100,
          Math.round(((scrollTop + viewportHeight) / fullHeight) * 100)
        );

        if (scrollPercent > maxScrollRef.current) {
          maxScrollRef.current = scrollPercent;
        }
      }, THROTTLE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Capture initial scroll position (user may already be partway down)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
      }
    };
  }, [viewKey]);

  const getMaxScrollPercent = useCallback(() => maxScrollRef.current, []);
  const reset = useCallback(() => { maxScrollRef.current = 0; }, []);

  return { getMaxScrollPercent, reset };
}
