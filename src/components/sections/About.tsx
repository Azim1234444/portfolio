import { motion } from "framer-motion";
import { GraduationCap} from "lucide-react";
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
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading eyebrow="About Me" title="The person behind the code." />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <FadeIn className="relative mx-auto w-full max-w-sm lg:mx-0">
            <ProfilePortrait />
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <p className="text-balance text-lg leading-relaxed text-mist sm:text-xl">
                {PERSONAL.bio}
              </p>
            </FadeIn>

            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} delay={i * 0.08} />
              ))}
            </div>

            <div className="mt-16">
              <FadeIn className="mb-8 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-neon-blue" />
                <h3 className="font-display text-xl font-medium text-ivory">Education</h3>
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
    <div className="group relative aspect-[4/5] w-full">
      <motion.div
        aria-hidden
        className="absolute -inset-4 rounded-[2.5rem] border border-dashed border-white/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <div className="glass-strong noise-overlay relative h-full w-full overflow-hidden rounded-[2rem]">
        <img
          src={profileImg}
          alt={PERSONAL.name}
          className="absolute inset-0 h-full w-full scale-105 object-cover object-top transition-transform duration-700 group-hover:scale-100"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/20 mix-blend-overlay"
        />
       
      </div>

      {[
        { label: "React", pos: "-left-6 top-8" },
        { label: "Unity", pos: "-right-6 top-1/2" },
        { label: "PHP", pos: "-left-4 bottom-10" },
      ].map((chip, i) => (
        <motion.span
          key={chip.label}
          className={`glass absolute ${chip.pos} rounded-full px-3 py-1.5 font-mono text-[11px] text-ivory shadow-lg`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          {chip.label}
        </motion.span>
      ))}
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="glass rounded-2xl px-5 py-6 text-center transition-colors hover:border-white/20 sm:text-left"
    >
      <p className="font-display text-3xl font-semibold tabular-nums text-ivory sm:text-4xl">
        {decimals ? animated.toFixed(decimals) : Math.round(animated)}
        <span className="text-neon-blue">{suffix}</span>
      </p>
      <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-fog">{label}</p>
    </motion.div>
  );
}

function EducationTimeline() {
  return (
    <ol className="relative border-l border-white/10 pl-8">
      {EDUCATION.map((edu, i) => (
        <motion.li
          key={edu.degree}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
          className="relative pb-12 last:pb-0"
        >
          <span className="absolute -left-[2.32rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-void ring-4 ring-void">
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 shadow-[0_0_12px_2px_rgba(79,156,255,0.7)]" />
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neon-blue">{edu.period}</p>
          <h4 className="mt-2 font-display text-lg font-medium text-ivory sm:text-xl">{edu.degree}</h4>
          <p className="mt-1 text-sm text-mist">
            {edu.institution} · {edu.location}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist/90">{edu.detail}</p>
          <span className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-violet-300">
            {edu.gpa}
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
