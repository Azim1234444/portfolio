import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const THEME_STORAGE_KEY = "portfolio-theme";

/** Read whatever the pre-paint script in index.html already decided. */
function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialised from the DOM rather than from storage, so React agrees with
  // what is already painted instead of flipping the page on hydration.
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    // Keeps form controls, scrollbars and the browser UI in step.
    document.documentElement.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f6fa" : "#050507");
  }, [theme]);

  // Follow the OS only while the visitor has not chosen for themselves.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    function onChange(e: MediaQueryListEvent) {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      setTheme(e.matches ? "light" : "dark");
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage — the choice just won't persist.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
