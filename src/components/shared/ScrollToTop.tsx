import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

/**
 * Route-change scroll manager.
 *
 * React Router keeps the previous scroll offset when the path changes, so
 * opening a project from halfway down the page would drop you halfway down the
 * detail page. This resets to the top on every navigation, and honours a hash
 * (e.g. `/#projects`) by scrolling to that section instead.
 */
/**
 * Resolve a URL fragment to an element.
 *
 * A raw hash can't go straight into `querySelector` — a CSS identifier may not
 * begin with a digit, so `/#2024` throws a SyntaxError. Because the caller runs
 * inside a timer, that throw would be an uncaught async exception no error
 * boundary can catch. `getElementById` has no such grammar, so it's the fallback.
 */
function findTarget(hash: string): HTMLElement | null {
  const id = hash.slice(1);
  if (!id) return null;
  try {
    return document.querySelector<HTMLElement>(hash);
  } catch {
    return document.getElementById(id);
  }
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();

  // The context value is rebuilt each render, so read it through a ref to keep
  // the effect keyed purely on the location.
  const scrollToRef = useRef(scrollTo);
  scrollToRef.current = scrollTo;

  // Stop the browser fighting us with its own restoration on back/forward.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const previous = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = previous;
      };
    }
  }, []);

  useEffect(() => {
    const jumpToTop = () => {
      try {
        scrollToRef.current(0, { immediate: true });
      } catch {
        // Lenis may not be mounted yet on the very first paint.
      }
      window.scrollTo(0, 0);
    };

    if (!hash) {
      jumpToTop();
      return;
    }

    // The home page grows as sections mount and images resolve, which shifts the
    // target after the first scroll starts — so re-aim a few times while it settles.
    const timers = [140, 600, 1100].map((delay) =>
      window.setTimeout(() => {
        const target = findTarget(hash);
        if (target) scrollToRef.current(target);
        else if (delay === 140) jumpToTop();
      }, delay)
    );

    // Once the visitor takes over, stop yanking them back to the anchor.
    const cancel = () => timers.forEach(window.clearTimeout);
    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, { passive: true, once: true });
    window.addEventListener("keydown", cancel, { once: true });

    return () => {
      cancel();
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };
  }, [pathname, hash]);

  return null;
}
