import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { useSectionNav } from "@/hooks/useSectionNav";
import { Magnetic } from "@/components/shared/Magnetic";
import { NAV_LINKS, PERSONAL, SOCIAL_LINKS } from "@/constants";

export function Footer() {
  const { goToSection } = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border pt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <button
          type="button"
          data-cursor="hover"
          onClick={() => goToSection(0)}
          className="group block w-full text-left"
          aria-label="Back to top"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block text-balance font-display text-[13vw] font-semibold leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_transparent] group-hover:text-gradient sm:text-[9vw] lg:text-[6.4vw]"
          >
            Let&apos;s create.
          </motion.span>
        </button>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border py-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-ivory">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm text-white">
                AH
              </span>
              Azim Halim
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              Software Engineer &amp; Game Developer crafting purposeful, polished digital
              experiences.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(link.href);
                    }}
                    data-cursor="hover"
                    className="inline-flex min-h-11 items-center text-sm text-mist transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">Connect</p>
            <div className="mt-4 flex items-center gap-3">
              <Magnetic>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={SOCIAL_LINKS.email}
                  aria-label="Email"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
            <p className="mt-4 text-sm text-mist">{PERSONAL.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-xs text-fog sm:flex-row">
          <p>© {year} Muhammad Nur Azim Abdul Halim. All rights reserved.</p>
          <button
            type="button"
            onClick={() => goToSection(0)}
            data-cursor="hover"
            className="flex min-h-11 items-center gap-1.5 transition-colors hover:text-ivory"
          >
            Back to top <FiArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
