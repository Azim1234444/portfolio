import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { useSectionNav } from "@/hooks/useSectionNav";
import { NAV_LINKS, PERSONAL, SOCIAL_LINKS } from "@/constants";

export function Footer() {
  const { goToSection } = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-void/65 py-14 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Top Metadata Line (inspired by reference footer) */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-10 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden
              className="h-7 w-7 shrink-0"
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
            <span className="font-display text-sm font-bold uppercase tracking-wider text-ivory">
              {PERSONAL.name}
            </span>
            <span className="text-fog">·</span>
            <span className="font-mono text-xs text-mist">Malaysia</span>
            {SOCIAL_LINKS.whatsapp && (
              <>
                <span className="text-fog">·</span>
                <a
                  href={`https://wa.me/${SOCIAL_LINKS.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-mist transition-colors hover:text-ivory"
                >
                  WhatsApp +60 16-349 5594
                </a>
              </>
            )}
            <span className="text-fog">·</span>
            <a
              href={SOCIAL_LINKS.email}
              className="font-mono text-xs text-mist transition-colors hover:text-ivory"
            >
              {PERSONAL.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-mist transition-colors hover:border-ivory hover:text-ivory"
            >
              <FiGithub className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-mist transition-colors hover:border-ivory hover:text-ivory"
            >
              <FiLinkedin className="h-4 w-4" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-mist transition-colors hover:border-ivory hover:text-ivory"
            >
              <FiMail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Navigation Links Bar */}
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border py-6 font-mono text-xs uppercase tracking-[0.16em]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.href);
                }}
                className="inline-flex min-h-9 items-center text-mist transition-colors hover:text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom Copyright & Back to Top */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 font-mono text-xs text-fog sm:flex-row sm:items-center">
          <p>© {year} {PERSONAL.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={() => goToSection(0)}
            className="inline-flex min-h-9 items-center gap-2 uppercase tracking-[0.18em] text-mist transition-colors hover:text-ivory"
          >
            Back to top <FiArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
