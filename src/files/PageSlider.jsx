import { useState, useEffect, useCallback, Children } from "react";
import { useSwipe } from "./useSwipe";
import "./PageSlider.css";

/**
 * PageSlider
 *
 * Wraps any number of children as full-screen swipeable "pages".
 * Navigation: swipe left/right on touch devices, ← → arrow keys on desktop.
 *
 * Props:
 *   children        — the pages (each becomes one full-screen slide)
 *   showDots        — show page indicator dots (default true)
 *   showArrows      — show prev/next arrow buttons (default true)
 *   transitionMs    — animation duration in ms (default 400)
 */
export function PageSlider({
  children,
  showDots = true,
  showArrows = true,
  transitionMs = 400,
}) {
  const pages = Children.toArray(children);
  const total = pages.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const navigate = useCallback(
    (next) => {
      if (animating || next < 0 || next >= total) return;
      setAnimating(true);
      setCurrent(next);
      setTimeout(() => setAnimating(false), transitionMs);
    },
    [animating, total, transitionMs]
  );

  const goNext = useCallback(() => navigate(current + 1), [current, navigate]);
  const goPrev = useCallback(() => navigate(current - 1), [current, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev });

  return (
    <div className="ps-root" {...swipeHandlers}>
      {/* Sliding track — all pages sit side-by-side, we translate to show the active one */}
      <div
        className="ps-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {pages.map((page, i) => (
          <div
            key={i}
            className="ps-page"
            aria-hidden={i !== current}
            tabIndex={i === current ? 0 : -1}
          >
            {page}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {showDots && total > 1 && (
        <div className="ps-dots" aria-label="Page navigation">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`ps-dot${i === current ? " ps-dot--active" : ""}`}
              onClick={() => navigate(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === current}
            />
          ))}
        </div>
      )}

      {/* Arrow buttons */}
      {showArrows && (
        <>
          <button
            className="ps-arrow ps-arrow--prev"
            onClick={goPrev}
            disabled={current === 0}
            aria-label="Previous page"
          >
            ‹
          </button>
          <button
            className="ps-arrow ps-arrow--next"
            onClick={goNext}
            disabled={current === total - 1}
            aria-label="Next page"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
