import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SKILLS } from "@/data/skills";
import type { SkillCategory } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Capabilities"
          title="Tools I build with."
          description="A full-stack toolkit spanning web development, game engines, ERP systems and design tooling."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((category, i) => (
            <SkillCategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      className="glass group rounded-3xl p-7 transition-colors hover:border-white/20 sm:p-8"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-neon-blue transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-display text-lg font-medium text-ivory">{category.title}</h3>
      </div>

      <div className="space-y-5">
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-mist">{skill.name}</span>
              <span className="font-mono text-xs text-fog">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: skill.level / 100 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
                style={{ transformOrigin: "left" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
