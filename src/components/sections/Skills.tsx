import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SKILLS } from "@/data/skills";
import type { SkillCategory } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Frontend:
    "Responsive interfaces, modern component architectures, and accessible motion systems.",
  Backend:
    "RESTful APIs, relational data modeling, authentication, and server-side business logic.",
  Programming:
    "Core object-oriented and procedural foundations across web, desktop, and engine scripting.",
  "Game Development":
    "Interactive 3D environments, XR/VR spatial interactions, physics, and custom assets.",
  "UI/UX & Analysis":
    "Requirement gathering, workflow modeling, wireframing, and human-centered interface design.",
  "CMS & SEO":
    "Production WordPress deployments, hosting infrastructure, and technical search optimization.",
  "Tools & Platforms":
    "Version control, development environments, systems diagrams, and multimedia post-production.",
};

export function Skills() {
  return (
    <section id="skills" className="relative border-b border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="What I Do"
          title="Capabilities & Toolkit"
          description="Full-stack web development, enterprise business systems, and interactive 3D engineering — structured for reliability and speed."
        />

        {/* Architectural 1px Hairline Matrix inspired by reference */}
        <div className="mt-16 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((category, i) => (
            <SkillCategoryCell key={category.title} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCell({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const Icon = category.icon;
  const num = String(index + 1).padStart(2, "0");
  const description =
    CATEGORY_DESCRIPTIONS[category.title] ??
    "Production tools and technologies used across client and engineering projects.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: EASE }}
      className="group flex flex-col justify-between border-b border-r border-border bg-void/65 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-void/80 sm:p-9"
    >
      <div>
        <div className="flex items-center justify-between font-mono text-xs text-fog">
          <span>{num}</span>
          <Icon className="h-4 w-4 text-mist transition-colors group-hover:text-ivory" />
        </div>

        <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-ivory">
          {category.title}
        </h3>

        <p className="mt-2.5 text-justify text-sm leading-relaxed text-mist">
          {description}
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-1.5 border-t border-border pt-5">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-sm border border-border bg-tint px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ivory/90"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
