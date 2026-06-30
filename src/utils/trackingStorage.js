/**
 * trackingStorage.js
 * Wraps localStorage read/append/write for the interaction tracking buffer.
 * All session data is stored under a single top-level key.
 */

const STORAGE_KEY = 'interactionTracking';

/**
 * Generate session-level metadata (called once per app load).
 */
export function createSessionMeta() {
  return {
    sessionId: crypto.randomUUID(),
    userAgent: navigator.userAgent,
    sessionStartedAt: new Date().toISOString(),
    lastSentAt: null,
    views: {},
  };
}

/**
 * Read the current session data from localStorage.
 * Returns null if nothing stored yet.
 */
export function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Write session data to localStorage (full overwrite of the key).
 */
export function writeSession(sessionData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

/**
 * Append a view record to the session data in localStorage.
 * @param {object} sessionData - The current session object (mutated in place)
 * @param {string} viewKey - The view/component name
 * @param {object} record - { activeSeconds, maxScrollPercent, enteredAt, exitedAt }
 */
export function appendViewRecord(sessionData, viewKey, record) {
  if (!sessionData.views[viewKey]) {
    sessionData.views[viewKey] = [];
  }
  sessionData.views[viewKey].push(record);
  writeSession(sessionData);
}

/**
 * Clear the localStorage buffer after a successful send.
 * Keeps session metadata but resets views and updates lastSentAt.
 */
export function markAsSent(sessionData) {
  sessionData.views = {};
  sessionData.lastSentAt = new Date().toISOString();
  writeSession(sessionData);
}

/**
 * Check if there is any view data worth sending.
 */
export function hasViewData(sessionData) {
  return sessionData && Object.keys(sessionData.views).length > 0;
}
