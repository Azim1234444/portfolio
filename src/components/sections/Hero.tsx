import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Download, FolderKanban, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/Magnetic";
import { ParticlesBackground } from "@/components/shared/ParticlesBackground";
import { HeroVisualFallback } from "@/components/three/HeroVisualFallback";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";
import { useSmoothScroll } from "@/context/SmoothScrollProvider";
import { useLoading } from "@/context/LoadingContext";
import { PERSONAL, SOCIAL_LINKS } from "@/constants";

const HeroCanvas = lazy(() =>
  import("@/components/three/HeroCanvas").then((m) => ({ default: m.HeroCanvas }))
);

const EASE = [0.16, 1, 0.3, 1] as const;

// These are relative to the moment the loading screen finishes (isLoading
// flips false) — the `!isLoading` gate below is what actually holds the
// animation back, so delays here only need to be small stagger offsets.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const { isLoading } = useLoading();
  const { scrollTo } = useSmoothScroll();
  const role = useTypewriter({ words: PERSONAL.roles, enabled: !isLoading, startDelay: 500 });

  // Three.js is ~237KB gzipped and mobile Lighthouse simulates a slow CPU, so
  // phones get the CSS visual instead. Because this gate wraps the lazy import,
  // the chunk is never even requested there — not merely hidden.
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useReducedMotion();
  const useWebGL = !isSmallScreen && !reducedMotion;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 sm:pt-24"
    >
      <div aria-hidden className="absolute inset-0 bg-grid mask-fade-bottom opacity-40" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] h-[min(560px,70vw)] w-[min(560px,100vw)] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px] sm:blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute right-[-10%] bottom-[-10%] h-[min(460px,60vw)] w-[min(460px,80vw)] rounded-full bg-violet-500/20 blur-[90px] sm:blur-[140px]"
      />
      <ParticlesBackground density={44} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate={!isLoading ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mist">
              Open to opportunities
            </span>
          </motion.div>

          <motion.p variants={item} className="font-mono text-sm tracking-[0.2em] text-neon-blue">
            HI, I&apos;M
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ivory sm:text-6xl lg:text-[4.5rem]"
          >
            Muhammad Nur Azim
            <br />
            <span className="text-gradient">Abdul Halim</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-6 flex h-9 items-center font-mono text-lg text-mist sm:text-xl"
          >
            <span className="mr-2 text-violet-400">{">"}</span>
            <span>{role}</span>
            <span className="ml-1 h-6 w-[2px] animate-pulse bg-neon-blue" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {PERSONAL.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button asChild size="lg" variant="primary">
                <a href={PERSONAL.resumeUrl} download data-cursor="hover">
                  <Download /> Download Resume
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="outline"
                data-cursor="hover"
                onClick={() => scrollTo("#projects")}
              >
                <FolderKanban /> View Projects
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="ghost"
                data-cursor="hover"
                onClick={() => scrollTo("#contact")}
              >
                <Send /> Contact Me
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex items-center gap-3">
            <span className="h-px w-10 bg-white/15" />
            <div className="flex items-center gap-2">
              <SocialIcon href={SOCIAL_LINKS.github} label="GitHub" icon={FiGithub} />
              <SocialIcon href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={FiLinkedin} />
              <SocialIcon href={SOCIAL_LINKS.email} label="Email" icon={FiMail} />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="relative order-first h-[320px] sm:h-[420px] lg:order-last lg:h-[620px]"
        >
          {useWebGL ? (
            <Suspense fallback={<HeroVisualFallback />}>
              <HeroCanvas />
            </Suspense>
          ) : (
            <HeroVisualFallback />
          )}
        </motion.div>
      </div>

      <motion.button
        type="button"
        data-cursor="hover"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-fog sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown className="h-4 w-4" />
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
    <Magnetic strength={0.5}>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        aria-label={label}
        className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
      >
        <Icon className="h-4 w-4" />
      </a>
    </Magnetic>
  );
}
