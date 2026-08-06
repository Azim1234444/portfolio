import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";

export interface LightboxImage {
  src: string;
  caption: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Drag distance (or flick velocity) needed to advance a slide. */
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 400;

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const isOpen = index !== null;
  const total = images.length;

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      // Wrap around so the ends are never dead.
      onNavigate((next + total) % total);
    },
    [onNavigate, total]
  );

  const prev = useCallback(() => index !== null && goTo(index - 1), [goTo, index]);
  const next = useCallback(() => index !== null && goTo(index + 1), [goTo, index]);

  // Keyboard: arrows navigate, Escape closes.
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, prev, next]);

  // Lock page scroll (incl. Lenis, which reads body overflow) while open.
  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lightbox-open");
    containerRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.documentElement.classList.remove("lightbox-open");
      restoreFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next();
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) prev();
  }

  if (typeof document === "undefined") return null;

  const current = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index! + 1} of ${total}: ${current.caption}`}
          tabIndex={-1}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
          className="fixed inset-0 z-[120] flex flex-col bg-black/90 outline-none"
          onClick={onClose}
        >
          {/* Top bar: counter + close */}
          <div
            className="relative flex items-center justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-xs tracking-[0.2em] text-mist">
              {String(index! + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ivory transition-colors hover:bg-white/[0.12]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-16">
            {total > 1 && (
              <NavButton side="left" onClick={prev} />
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.caption}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                // object-contain keeps the whole frame visible — never cropped.
                className="max-h-full max-w-full cursor-grab touch-pan-y select-none rounded-xl object-contain shadow-2xl active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {total > 1 && <NavButton side="right" onClick={next} />}
          </div>

          {/* Caption + thumbnails */}
          <div
            className="relative shrink-0 px-5 pb-5 pt-4 sm:px-8 sm:pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-balance text-center text-sm text-mist">{current.caption}</p>

            {total > 1 && (
              <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
                {images.map((shot, i) => (
                  <button
                    key={shot.src}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`View image ${i + 1}: ${shot.caption}`}
                    aria-current={i === index}
                    data-cursor="hover"
                    className={cn(
                      "h-11 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300",
                      i === index
                        ? "border-neon-blue opacity-100 ring-1 ring-neon-blue/50"
                        : "border-white/10 opacity-45 hover:opacity-80"
                    )}
                  >
                    <img
                      src={shot.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      data-cursor="hover"
      className={cn(
        "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-ivory backdrop-blur transition-all hover:scale-110 hover:bg-white/[0.14] sm:h-12 sm:w-12",
        side === "left" ? "left-1 sm:left-4" : "right-1 sm:right-4"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
