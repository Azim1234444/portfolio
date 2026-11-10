import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/RevealText";
import { useCountUp } from "@/hooks/useCountUp";
import { PERSONAL } from "@/constants";
import { STATS } from "@/data/stats";
import { EDUCATION } from "@/data/education";
import profileImg from "@/assets/images/profile.webp";

const EASE = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" className="relative border-b border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="Profile" title="The Engineer Behind the Work" />

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <FadeIn className="relative mx-auto w-full max-w-sm lg:mx-0">
            <ProfilePortrait />
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <p className="text-justify text-base leading-relaxed text-mist sm:text-lg">
                {PERSONAL.bio}
              </p>
            </FadeIn>

            {/* Architectural 1px hairline stats bar */}
            <div className="mt-12 grid grid-cols-2 divide-x divide-y divide-border border border-border bg-void/65 backdrop-blur-sm sm:grid-cols-4 sm:divide-y-0">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} delay={i * 0.08} />
              ))}
            </div>

            {/* Education Ledger */}
            <div className="mt-16 border-t border-border pt-12">
              <FadeIn className="mb-8 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-fog">
                  Academic Background
                </p>
                <span className="font-mono text-xs text-fog">UiTM</span>
              </FadeIn>
              <EducationTimeline />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePortrait() {
  return (
    <div className="group overflow-hidden rounded-sm border border-border bg-void/65 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border bg-void/75 px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
          ID · AZIM HALIM
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
        </span>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        <img
          src={profileImg}
          alt={PERSONAL.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            Based in
          </p>
          <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Johor &amp; Selangor, Malaysia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-void/65 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
        <span className="py-2.5 text-center">Full Stack</span>
        <span className="py-2.5 text-center">Systems</span>
        <span className="py-2.5 text-center">3D / Unity</span>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  decimals,
  delay,
}: (typeof STATS)[number] & { delay: number }) {
  const { ref, value: animated } = useCountUp({ end: value, decimals });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="bg-surface/50 px-5 py-6"
    >
      <p className="font-display text-3xl font-bold tabular-nums tracking-tight text-ivory sm:text-4xl">
        {decimals ? animated.toFixed(decimals) : Math.round(animated)}
        <span className="text-mist">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-fog">
        {label}
      </p>
    </motion.div>
  );
}

function EducationTimeline() {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {EDUCATION.map((edu, i) => (
        <motion.li
          key={edu.degree}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
          className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[0.34fr_0.66fr] sm:gap-8"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ivory">
              0{i + 1} · {edu.period}
            </p>
            <p className="mt-1.5 font-mono text-xs text-fog">{edu.location}</p>
            <span className="mt-3 inline-flex items-center rounded-sm border border-border-strong bg-tint px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory">
              {edu.gpa}
            </span>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ivory sm:text-xl">
              {edu.degree}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-mist">
              {edu.institution}
            </p>
            <p className="mt-3 text-justify text-sm leading-relaxed text-mist">{edu.detail}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
