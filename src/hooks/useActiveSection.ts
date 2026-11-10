import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll-spy: tracks which section crosses the upper reading line (~25% from top of viewport),
 * working reliably regardless of section height (e.g. tall multi-project sections),
 * and keeps "projects" active when viewing individual `/projects/:slug` pages.
 */
export function useActiveSection(ids: string[]) {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (pathname.startsWith("/projects/")) {
      setActiveId("projects");
      return;
    }

    let rafId = 0;

    function computeActive() {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (elements.length === 0) return;

      // If scrolled to the very bottom of the page, activate the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 32
      ) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      // Reading line at 25% from the top of the viewport
      const readingLine = window.innerHeight * 0.25;
      let currentId = elements[0].id;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= readingLine) {
          currentId = el.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    }

    function onScrollOrResize() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        computeActive();
      });
    }

    computeActive();
    // Re-check shortly after mount/route transition in case layout shifts
    const settleTimer = window.setTimeout(computeActive, 120);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [ids, pathname]);

  return pathname.startsWith("/projects/") ? "projects" : activeId;
}
