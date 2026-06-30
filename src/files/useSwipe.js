import { useRef, useCallback } from "react";

/**
 * useSwipe — detects left/right swipe gestures on a DOM element.
 *
 * Usage:
 *   const { onTouchStart, onTouchEnd } = useSwipe({
 *     onSwipeLeft:  () => goNext(),
 *     onSwipeRight: () => goPrev(),
 *     threshold: 50,   // px of travel required (default 50)
 *   });
 *   <div {...{ onTouchStart, onTouchEnd }}>...</div>
 */
export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }) {
  const startX = useRef(null);

  const onTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      if (startX.current === null) return;
      const delta = e.changedTouches[0].clientX - startX.current;
      if (delta < -threshold) onSwipeLeft?.();
      else if (delta > threshold) onSwipeRight?.();
      startX.current = null;
    },
    [onSwipeLeft, onSwipeRight, threshold]
  );

  return { onTouchStart, onTouchEnd };
}
