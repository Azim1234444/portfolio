import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

/**
 * Light/dark switch. 44px square so it clears the touch minimum, and the icon
 * cross-fades rather than swapping instantly so the change reads as deliberate.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="hover"
      // The label states the outcome, not the current state — screen reader
      // users need to know what pressing it does.
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      title={`Switch to ${isLight ? "dark" : "light"} theme`}
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-mist transition-colors hover:bg-tint-3 hover:text-ivory",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -75, scale: 0.6 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 75, scale: 0.6 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute flex items-center justify-center"
        >
          {isLight ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
