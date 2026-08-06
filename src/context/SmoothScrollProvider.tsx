import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";

interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(raf);
  }, []);

  const scrollTo: SmoothScrollContextValue["scrollTo"] = (target, options) => {
    lenisRef.current?.lenis?.scrollTo(target as never, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      ...options,
    });
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      <ReactLenis
        root
        ref={lenisRef}
        options={{
          autoRaf: false,
          duration: 1.2,
          smoothWheel: true,
          syncTouch: false,
          touchMultiplier: 1.6,
        }}
      >
        {children}
      </ReactLenis>
    </SmoothScrollContext.Provider>
  );
}
