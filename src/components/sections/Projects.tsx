import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PROJECTS } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[min(500px,60vh)] w-[min(900px,100vw)] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[100px] sm:blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured projects."
          description="A mix of live client websites, full-stack platforms, enterprise systems and interactive 3D work — each shaped by real requirements and real users."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
