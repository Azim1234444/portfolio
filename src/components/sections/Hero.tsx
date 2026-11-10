import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Download, FolderKanban, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/Magnetic";
import { PerspectiveGrid } from "@/components/shared/PerspectiveGrid";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { PERSONAL, SOCIAL_LINKS } from "@/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const role = useTypewriter({ words: PERSONAL.roles, startDelay: 350 });

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden border-b border-border pb-20 pt-28 sm:pt-32"
    >
      {/* Animated 3D Perspective Wireframe Runway + Active Tiles + Starfield */}
      <PerspectiveGrid horizonRatio={0.34} columns={10} rows={16} showStars />

      {/* Vignette fade so text stays ultra-crisp against the grid horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0%,var(--color-void)_82%)] opacity-60"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Availability status line */}
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2.5 rounded-sm border border-border bg-void/80 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-mist">
              Open to opportunities · Malaysia
            </span>
          </motion.div>

          {/* Giant Centered Uppercase Display Headline */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-ivory"
          >
            MUHAMMAD NUR AZIM
            <span className="mt-1 block text-ivory/90">ABDUL HALIM</span>
          </motion.h1>

          {/* Spaced uppercase role / typewriter bar */}
          <motion.div
            variants={item}
            className="mt-6 flex h-8 items-center justify-center font-mono text-xs uppercase tracking-[0.28em] text-mist sm:text-sm"
          >
            <span className="mr-2 text-fog">//</span>
            <span>{role}</span>
            <span className="ml-1.5 h-4 w-[2px] animate-pulse bg-ivory" />
          </motion.div>

          {/* Concise centered pitch */}
          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-mist sm:text-lg"
          >
            {PERSONAL.tagline}
          </motion.p>

          {/* Sharp High-Contrast CTA Pair + Secondary Action */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <Magnetic strength={0.25}>
              <Button size="lg" variant="primary" onClick={() => scrollTo("#projects")}>
                <FolderKanban /> View Selected Work
              </Button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
                <Send /> Start a Conversation
              </Button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <Button asChild size="lg" variant="ghost">
                <a href={PERSONAL.resumeUrl} download>
                  <Download /> Resume PDF
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Minimalist social links row */}
          <motion.div variants={item} className="mt-12 flex items-center gap-4">
            <span className="h-px w-8 bg-border-strong" />
            <div className="flex items-center gap-1.5">
              <SocialIcon href={SOCIAL_LINKS.github} label="GitHub" icon={FiGithub} />
              <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={FiLinkedin} />
              <SocialIcon href={SOCIAL_LINKS.email} label="Email" icon={FiMail} />
            </div>
            <span className="h-px w-8 bg-border-strong" />
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-fog transition-colors hover:text-ivory sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof FiGithub;
}) {
  return (
    <Magnetic strength={0.35}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-void/70 text-mist transition-colors hover:border-ivory hover:text-ivory"
      >
        <Icon className="h-4 w-4" />
      </a>
    </Magnetic>
  );
}
