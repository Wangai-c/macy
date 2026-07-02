/**
 * trackingSender.js
 * Handles batched flush of tracking data via sendBeacon.
 * Wired up once at the app root — independent of which view is active.
 *
 * KEY DESIGN: The sender does NOT listen for visibilitychange/pagehide itself.
 * Instead, useViewTracking flushes its data to localStorage first, THEN calls
 * trySendBatch() directly. This guarantees ordering: flush → send.
 */

import { readSession, markAsSent, hasViewData } from './trackingStorage';

// ============================================================
//  Leave `true` for production (GitHub Pages).
//  CORS errors on localhost are expected — Formspree only allows
//  requests from the deployed domain. They won't affect the live site.
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
 * Called by useViewTracking AFTER it has flushed view data to localStorage.
 * Returns true if the browser accepted the request.
 */
export function trySendBatch() {
  if (!TRACKING_ENABLED) return false;

  const sessionData = readSession();
  if (!sessionData || !hasViewData(sessionData)) {
    return false;
  }

  // Skip trivial sessions (quick reloads, accidental visits)
  if (!meetsMinimumEngagement(sessionData)) {
    return false;
  }

  // Build payload — snapshot of current session.
  // Use FormData (multipart/form-data) instead of a JSON Blob to avoid
  // CORS preflight — sendBeacon + application/json triggers a preflight
  // that Formspree rejects.
  const payload = { ...sessionData };
  const formData = new FormData();
  formData.append('_subject', 'Session Tracking');
  formData.append('payload', JSON.stringify(payload, null, 2));
  const accepted = navigator.sendBeacon(FORMSPREE_ENDPOINT, formData);

  if (accepted) {
    markAsSent(sessionData);
  }

  return accepted;
}

/**
 * Initialize the time-based backup sender. Call once at app root mount.
 * Returns a cleanup function.
 *
 * NOTE: visibilitychange/pagehide sends are now handled by useViewTracking
 * (flush-then-send), so this only sets up the periodic backup check.
 */
export function initTrackingSender() {
  // --- Time-based backup flush ---
  const backupInterval = setInterval(() => {
    if (!TRACKING_ENABLED) return;

    const session = readSession();
    if (!session) return;

    const lastSent = session.lastSentAt ? new Date(session.lastSentAt).getTime() : 0;
    const now = Date.now();

    if (now - lastSent > BACKUP_FLUSH_INTERVAL_MS && hasViewData(session)) {
      trySendBatch();
    }
  }, 60 * 1000); // Check every minute

  // Return cleanup
  return () => {
    clearInterval(backupInterval);
  };
}
