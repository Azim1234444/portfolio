import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Floor — long enough to read as intentional branding, short enough to forgive. */
const MIN_DURATION = 700;
/** Ceiling — never hold the page hostage to a slow font request. */
const MAX_DURATION = 1600;
/** Must stay in step with the wipe transition on the backdrop below. */
const EXIT_DURATION = 600;

export function Loader() {
  const { isLoading, setIsLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let raf: number;
    let exitTimer: number;
    const start = performance.now();

    // Tie the finish to something real rather than a fixed timer: web fonts are
    // what actually cause visible reflow here. `MAX_DURATION` is the backstop.
    let ready = false;
    const markReady = () => {
      ready = true;
    };
    if (document.fonts) {
      // Settle either way — a font failure shouldn't strand the loader.
      document.fonts.ready.then(markReady, markReady);
    } else {
      markReady();
    }

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / MIN_DURATION);
      // Ease so it isn't perfectly linear — accelerates then settles.
      const eased = pct < 0.85 ? pct * 1.05 : 0.9 + (pct - 0.85) * 0.66;
      // Hold at 99 until we genuinely finish, so it never reads 100% and waits.
      setProgress(Math.min(99, Math.round(eased * 100)));

      const done = elapsed >= MIN_DURATION && (ready || elapsed >= MAX_DURATION);
      if (!done) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      setExiting(true);
      exitTimer = window.setTimeout(() => setIsLoading(false), EXIT_DURATION);
    }
    raf = requestAnimationFrame(tick);

    // Both handles must be released — under StrictMode this effect runs twice,
    // and an orphaned timer would flip `isLoading` behind the live instance.
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(exitTimer);
    };
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Backdrop panels that wipe apart on exit */}
          <motion.div
            className="absolute inset-0 bg-void"
            animate={{ clipPath: exiting ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
            transition={{ duration: EXIT_DURATION / 1000, ease: EASE }}
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center"
              animate={exiting ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2.5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#loader-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={264}
                  animate={{ strokeDashoffset: 264 - (264 * progress) / 100 }}
                  transition={{ duration: 0.15, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f9cff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-display text-2xl font-semibold tracking-tight text-gradient">
                AH
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-3"
              animate={exiting ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-mono text-xs tracking-[0.3em] text-fog">
                LOADING EXPERIENCE
              </p>
              <p className="font-display text-3xl font-medium tabular-nums text-ivory">
                {progress}
                <span className="text-fog">%</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
