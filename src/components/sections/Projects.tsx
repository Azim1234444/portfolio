import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative border-b border-border py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Case Studies"
          description="Live client websites, enterprise safety workflows, full-stack platforms and interactive 3D applications — engineered for clarity and real-world impact."
        />

        <div className="mt-16 divide-y divide-border border-t border-border">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
