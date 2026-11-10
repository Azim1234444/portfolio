import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLenis } from "lenis/react";
import { useSectionNav } from "@/hooks/useSectionNav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Magnetic } from "@/components/shared/Magnetic";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NAV_LINKS, PERSONAL, SOCIAL_LINKS } from "@/constants";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { cn } from "@/utils/cn";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { goToSection } = useSectionNav();

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 24);
  });

  // Ref-counted so this can't stomp on another overlay's lock (or be stomped).
  useEffect(() => {
    if (!mobileOpen) return;
    lockScroll();
    return unlockScroll;
  }, [mobileOpen]);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    goToSection(href);
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.05, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center border-b border-transparent transition-colors duration-300"
        style={{
          borderColor: scrolled ? "var(--color-border)" : "transparent",
          backgroundColor: scrolled ? "var(--glass-strong-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <nav className="flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-8 lg:px-12">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            aria-label="Muhammad Nur Azim — back to top"
            className="flex h-11 items-center gap-3 text-ivory"
          >
            <svg
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden
              className="h-8 w-8 shrink-0"
            >
              <rect
                x="2"
                y="2"
                width="60"
                height="60"
                rx="6"
                fill="var(--color-void)"
                stroke="var(--color-ivory)"
                strokeWidth="3.5"
              />
              <path
                d="M32 12L50 48H39.5L32 32.5L24.5 48H14L32 12Z"
                fill="var(--color-ivory)"
              />
              <path d="M25 38H39L42 44H22L25 38Z" fill="#10B981" />
            </svg>
            <span className="hidden font-mono text-xs font-medium uppercase tracking-[0.2em] text-ivory sm:inline">
              AZIM HALIM
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "relative z-10 flex min-h-10 items-center rounded-sm px-3.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200",
                      isActive ? "text-void" : "text-mist hover:text-ivory"
                    )}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-sm bg-ivory"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-1 md:flex">
              <IconLink href={SOCIAL_LINKS.github} label="GitHub" icon={FiGithub} />
              <IconLink href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={FiLinkedin} />
              <IconLink href={SOCIAL_LINKS.email} label="Email" icon={FiMail} />
            </div>

            <button
              type="button"
              onClick={() =>
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))
              }
              className="hidden min-h-10 items-center gap-2 rounded-sm border border-border bg-tint px-3 text-xs text-fog transition hover:border-border-strong hover:text-ivory sm:flex"
              aria-label="Open command palette"
            >
              <CommandIcon className="h-3.5 w-3.5" />
              <kbd className="font-mono text-[11px]">⌘K</kbd>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-sm text-ivory xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col bg-void/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-fog">
                Navigation
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-ivory"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col items-start justify-center divide-y divide-border px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: EASE }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between py-3.5 font-display text-3xl font-bold uppercase tracking-tight text-ivory transition-colors hover:text-mist"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-fog">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-8 py-6">
              <span className="font-mono text-xs text-fog">{PERSONAL.email}</span>
              <div className="flex items-center gap-2">
                <IconLink href={SOCIAL_LINKS.github} label="GitHub" icon={FiGithub} />
                <IconLink href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={FiLinkedin} />
                <IconLink href={SOCIAL_LINKS.email} label="Email" icon={FiMail} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function IconLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Magnetic strength={0.3}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        className="flex h-10 w-10 items-center justify-center rounded-sm text-mist transition-colors hover:bg-tint-2 hover:text-ivory"
      >
        <Icon className="h-4 w-4" />
      </a>
    </Magnetic>
  );
}
