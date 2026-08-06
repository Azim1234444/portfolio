import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EXPERIENCE } from "@/data/experience";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Career"
          title="Where I've made an impact."
          description="Hands-on roles spanning safety-critical systems and full-stack web platforms."
        />

        <div className="relative mt-16 space-y-8">
          <div
            aria-hidden
            className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-blue-500/40 via-tint-3 to-transparent sm:block"
          />
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: (typeof EXPERIENCE)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className="relative sm:pl-16"
    >
      <span className="absolute left-2.5 top-7 hidden h-7 w-7 items-center justify-center rounded-full glass-strong text-neon-blue sm:flex">
        <Briefcase className="h-3.5 w-3.5" />
      </span>

      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="glass group relative overflow-hidden rounded-3xl p-7 sm:p-9"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h3 className="font-display text-2xl font-medium text-ivory sm:text-[1.7rem]">
              {exp.role}
            </h3>
            <p className="mt-1.5 text-base text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-medium">
              {exp.company}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1.5 text-xs text-fog sm:items-end">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {exp.location}
            </span>
          </div>
        </div>

        <p className="relative mt-5 max-w-3xl text-sm leading-relaxed text-mist sm:text-base">
          {exp.summary}
        </p>

        <ul className="relative mt-5 space-y-2.5">
          {exp.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-mist/90">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-blue" />
              {h}
            </li>
          ))}
        </ul>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-tint px-3 py-1 font-mono text-[11px] text-mist transition-colors group-hover:border-border-strong"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
