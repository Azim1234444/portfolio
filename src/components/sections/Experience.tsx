import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EXPERIENCE } from "@/data/experience";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="relative border-b border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Career"
          title="Industry Experience"
          description="Hands-on engineering roles delivering safety-critical industrial workflows and university-wide management platforms."
        />

        <div className="mt-16 divide-y divide-border border-y border-border">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceRow key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ exp, index }: { exp: (typeof EXPERIENCE)[number]; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-14 sm:py-16"
    >
      {/* Left Column: Index, Period, Company & Location */}
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            <span className="text-ivory">Role {num}</span>
            <span>·</span>
            <span>{exp.period}</span>
          </div>
          <p className="mt-3 font-display text-lg font-bold uppercase tracking-tight text-ivory">
            {exp.company}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-fog">
            {exp.location}
          </p>
        </div>
      </div>

      {/* Right Column: Role Title, Summary, Bullet Points & Tech Tags */}
      <div>
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ivory sm:text-3xl">
          {exp.role}
        </h3>

        <p className="mt-4 text-base leading-relaxed text-mist">
          {exp.summary}
        </p>

        <ul className="mt-6 space-y-3 border-t border-border pt-6">
          {exp.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-mist">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ivory" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border bg-tint px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mist"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
