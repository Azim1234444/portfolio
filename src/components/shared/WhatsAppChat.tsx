import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { PERSONAL, SOCIAL_LINKS } from "@/constants";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const EASE = [0.16, 1, 0.3, 1] as const;

const DEFAULT_MESSAGE = `Hi ${PERSONAL.firstName}, I came across your portfolio and would like to connect.`;

/** Digits only — wa.me rejects spaces, dashes and a leading `+`. */
function toWaNumber(raw: string) {
  return raw.replace(/[^\d]/g, "");
}

/**
 * Floating WhatsApp entry point. Opens a small composer so the visitor can
 * adjust the opening line before being handed off to WhatsApp itself.
 */
export function WhatsAppChat() {
  const number = toWaNumber(SOCIAL_LINKS.whatsapp ?? "");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reducedMotion = useReducedMotion();
  const panelId = useId();

  // Escape closes; click outside closes.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  // Without a number there is nothing to link to — render nothing rather than a dead button.
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(message.trim() || DEFAULT_MESSAGE)}`;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="Start a WhatsApp chat"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.94 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: EASE }}
            className="glass-strong fixed bottom-24 left-5 z-[60] w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden rounded-sm border border-border-strong shadow-2xl sm:bottom-28 sm:left-8"
          >
            <div className="relative flex items-center gap-3 border-b border-border bg-surface-2 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-emerald-500 text-white">
                <FaWhatsapp className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-ivory">
                  {PERSONAL.firstName}
                </p>
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mist">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Direct WhatsApp Line
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp chat"
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-sm text-mist transition-colors hover:bg-tint-3 hover:text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-void p-5">
              <p className="rounded-sm border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-mist">
                Send a message directly and I&apos;ll get back to you on WhatsApp.
              </p>

              <label htmlFor={`${panelId}-msg`} className="sr-only">
                Message
              </label>
              <textarea
                id={`${panelId}-msg`}
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="mt-4 w-full resize-none rounded-sm border border-border bg-tint px-3.5 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-fog focus:border-ivory"
                placeholder="Write your message…"
              />

              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-ivory px-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-void transition-opacity hover:opacity-90"
              >
                <Send className="h-3.5 w-3.5" /> Open in WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        aria-expanded={open}
        aria-controls={panelId}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 left-5 z-[60] flex h-11 w-11 items-center justify-center rounded-sm border border-border-strong bg-void text-ivory shadow-lg transition-colors hover:border-ivory sm:bottom-8 sm:left-8"
      >
        {/* Idle pulse to draw the eye without being noisy. */}
        {!open && !reducedMotion && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="relative"
          >
            {open ? <X className="h-5 w-5" /> : <FaWhatsapp className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
