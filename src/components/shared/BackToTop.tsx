import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useLenis((lenis) => {
    setVisible(lenis.scroll > window.innerHeight * 0.8);
  });

  // Fallback for the very first paint before Lenis reports scroll.
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          data-cursor="hover"
          onClick={() => scrollTo(0)}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-ivory shadow-lg shadow-black/40 sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
