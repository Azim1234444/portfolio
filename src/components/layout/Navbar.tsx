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
        transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500",
            scrolled ? "glass-strong shadow-[0_8px_40px_-16px_rgba(0,0,0,0.7)]" : "bg-transparent"
          )}
        >
          <a
            href="#home"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            aria-label="Muhammad Nur Azim — back to top"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ivory"
          >
            {/* shrink-0 and aspect-square keep this a circle: as a flex child it
                was being squeezed into an oval once the nav ran short of room. */}
            <span className="flex aspect-square w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 font-display text-sm font-semibold text-white">
              AH
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
                    data-cursor="hover"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "relative z-10 flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-void" : "text-mist hover:text-ivory"
                    )}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
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
              data-cursor="hover"
              onClick={() =>
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))
              }
              className="hidden min-h-11 items-center gap-2 rounded-full border border-border bg-tint px-3.5 text-xs text-fog transition hover:border-border-strong hover:text-ivory sm:flex"
              aria-label="Open command palette"
            >
              <CommandIcon className="h-3.5 w-3.5" />
              <kbd className="font-mono">⌘K</kbd>
            </button>

            {/* Reachable at every width — on phones it is the one control
                besides the hamburger, so it must not hide behind the menu. */}
            <ThemeToggle />

            <button
              type="button"
              data-cursor="hover"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ivory xl:hidden"
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
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col bg-void/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg font-semibold text-ivory">Menu</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-ivory"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block py-3 font-display text-4xl font-medium text-ivory transition-colors hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-violet-400"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-border px-8 py-6">
              <span className="text-xs text-fog">{PERSONAL.email}</span>
              <div className="flex items-center gap-3">
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
    <Magnetic strength={0.4}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        className="flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:bg-tint-2 hover:text-ivory"
      >
        <Icon className="h-4 w-4" />
      </a>
    </Magnetic>
  );
}
