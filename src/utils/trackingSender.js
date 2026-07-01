/**
 * trackingSender.js
 * Handles batched flush of tracking data via sendBeacon.
 * Wired up once at the app root — independent of which view is active.
 */

import { readSession, markAsSent, hasViewData } from './trackingStorage';

// ============================================================
//  Flip to `true` when you want tracking to actually send.
//  Leave `false` during local dev to avoid CORS / wasted submissions.
// ============================================================
const TRACKING_ENABLED = false;
// ============================================================

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeeblbbj';

// Time-based backup flush interval: 2 hours (in ms)
const BACKUP_FLUSH_INTERVAL_MS = 2 * 60 * 60 * 1000;

// Minimum total active seconds across all views before we bother sending.
// Prevents reloads / accidental visits from burning Formspree submissions.
const MIN_ACTIVE_SECONDS = 5;

/**
 * Check if the session has enough engagement to be worth sending.
 */
function meetsMinimumEngagement(sessionData) {
  const views = sessionData.views;
  let totalActive = 0;
  for (const key of Object.keys(views)) {
    for (const record of views[key]) {
      totalActive += record.activeSeconds || 0;
    }
  }
  return totalActive >= MIN_ACTIVE_SECONDS;
}

/**
 * Send the current session buffer via sendBeacon.
 * Returns true if the browser accepted the request.
 */
function sendBatch() {
  if (!TRACKING_ENABLED) return false;

  const sessionData = readSession();
  if (!sessionData || !hasViewData(sessionData)) {
    return false;
  }

  // Skip trivial sessions (quick reloads, accidental visits)
  if (!meetsMinimumEngagement(sessionData)) {
    return false;
  }

  // Build payload — snapshot of current session
  const payload = { ...sessionData };

  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  const accepted = navigator.sendBeacon(FORMSPREE_ENDPOINT, blob);

  if (accepted) {
    markAsSent(sessionData);
  }

  return accepted;
}

/**
 * Initialize the sender listeners. Call once at app root mount.
 * Returns a cleanup function to remove listeners.
 */
export function initTrackingSender() {
  // --- Leave-based flush ---
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      sendBatch();
    }
  };

  const handlePageHide = () => {
    sendBatch();
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('pagehide', handlePageHide);

  // --- Time-based backup flush ---
  const backupInterval = setInterval(() => {
    const session = readSession();
    if (!session) return;

    const lastSent = session.lastSentAt ? new Date(session.lastSentAt).getTime() : 0;
    const now = Date.now();

    if (now - lastSent > BACKUP_FLUSH_INTERVAL_MS && hasViewData(session)) {
      sendBatch();
    }
  }, 60 * 1000); // Check every minute whether the backup threshold has been exceeded

  // Return cleanup
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('pagehide', handlePageHide);
    clearInterval(backupInterval);
  };
}
