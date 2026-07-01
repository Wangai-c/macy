/**
 * useViewTracking.js
 * Combines useActiveTime + useScrollDepth.
 * Flushes a per-view session record to the localStorage buffer
 * on view change, unmount, and page hide — then triggers sendBatch.
 *
 * The flush→send ordering is guaranteed because this hook does both
 * synchronously: flush to localStorage, then call trySendBatch().
 */

import { useRef, useEffect, useCallback } from 'react';
import { useActiveTime } from './useActiveTime';
import { useScrollDepth } from './useScrollDepth';
import {
  createSessionMeta,
  readSession,
  writeSession,
  appendViewRecord,
} from '../utils/trackingStorage';
import { trySendBatch } from '../utils/trackingSender';

// Module-level session reference — shared across all instances in the same tab
let sessionData = null;

function getSession() {
  if (!sessionData) {
    sessionData = readSession() || createSessionMeta();
    writeSession(sessionData);
  }
  return sessionData;
}

/**
 * @param {string} viewKey — the current view/component name (e.g. 'countdown', 'intro')
 */
export function useViewTracking(viewKey) {
  const { getActiveSeconds, reset: resetTime } = useActiveTime(viewKey);
  const { getMaxScrollPercent, reset: resetScroll } = useScrollDepth(viewKey);

  const enteredAtRef = useRef(new Date().toISOString());
  const previousViewRef = useRef(viewKey);
  const audioPlayedAtRef = useRef(null);

  // Core flush logic — writes one per-view record to the buffer
  const flush = () => {
    const activeSeconds = getActiveSeconds();
    const maxScrollPercent = getMaxScrollPercent();

    // Only write if there's meaningful data
    if (activeSeconds === 0 && maxScrollPercent === 0) return;

    const record = {
      activeSeconds,
      maxScrollPercent,
      enteredAt: enteredAtRef.current,
      exitedAt: new Date().toISOString(),
      audioPlayedAt: audioPlayedAtRef.current,
    };

    const session = getSession();
    appendViewRecord(session, previousViewRef.current, record);
  };

  // Flush current view data, then tell the sender to ship it.
  // After sending, re-sync the module-level session from localStorage
  // so the in-memory reference doesn't resurrect already-sent data.
  const flushAndSend = () => {
    flush();
    trySendBatch();
    // Re-sync: sendBatch may have cleared views via markAsSent
    sessionData = readSession();
  };

  // On viewKey change → flush the previous view, reset for the new one
  useEffect(() => {
    if (previousViewRef.current !== viewKey) {
      flush();
      resetTime();
      resetScroll();
      enteredAtRef.current = new Date().toISOString();
      previousViewRef.current = viewKey;
      audioPlayedAtRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  // On unmount → flush and send
  useEffect(() => {
    return () => {
      flushAndSend();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On visibilitychange → hidden: flush then send
  // This guarantees the view record is in localStorage BEFORE sendBeacon fires
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushAndSend();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  // On pagehide → flush and send
  useEffect(() => {
    const handlePageHide = () => {
      flushAndSend();
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => {
      window.removeEventListener('pagehide', handlePageHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  // Callback for the consumer to signal that audio was played
  const markAudioPlayed = useCallback(() => {
    if (!audioPlayedAtRef.current) {
      audioPlayedAtRef.current = new Date().toISOString();
    }
  }, []);

  return { markAudioPlayed };
}
