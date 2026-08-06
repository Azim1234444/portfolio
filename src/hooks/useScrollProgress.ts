import { useMotionValue } from "framer-motion";
import { useLenis } from "lenis/react";

/** Global 0–1 scroll progress driven by Lenis, as a Framer Motion value. */
export function useScrollProgress() {
  const progress = useMotionValue(0);
  useLenis((lenis) => {
    progress.set(lenis.progress);
  });
  return progress;
}
