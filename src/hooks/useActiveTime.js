/**
 * useActiveTime.js
 * Tracks active (engaged) time on a view.
 * "Active" = tab visible AND user has interacted within IDLE_THRESHOLD.
 */

import { useRef, useEffect, useCallback } from 'react';

const IDLE_THRESHOLD_MS = 30_000; // 30 seconds
const TICK_INTERVAL_MS = 1_000;   // 1 second

/**
 * @param {string} viewKey — identifies which view is currently mounted
 * @returns {{ getActiveSeconds: () => number, reset: () => void }}
 */
export function useActiveTime(viewKey) {
  const activeSecondsRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const tickIntervalRef = useRef(null);

  // Reset counter when viewKey changes
  useEffect(() => {
    activeSecondsRef.current = 0;
    lastActivityRef.current = Date.now();
  }, [viewKey]);

  // Mark user activity
  const markActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  // Set up the tick interval + activity listeners
  useEffect(() => {
    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    activityEvents.forEach(evt => {
      window.addEventListener(evt, markActivity, { passive: true });
    });

    tickIntervalRef.current = setInterval(() => {
      const isVisible = document.visibilityState === 'visible';
      const isActive = (Date.now() - lastActivityRef.current) < IDLE_THRESHOLD_MS;

      if (isVisible && isActive) {
        activeSecondsRef.current += 1;
      }
    }, TICK_INTERVAL_MS);

    return () => {
      activityEvents.forEach(evt => {
        window.removeEventListener(evt, markActivity);
      });
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current);
      }
    };
  }, [markActivity]);

  const getActiveSeconds = useCallback(() => activeSecondsRef.current, []);
  const reset = useCallback(() => { activeSecondsRef.current = 0; }, []);

  return { getActiveSeconds, reset };
}
