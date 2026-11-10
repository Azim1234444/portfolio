import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import type { ProjectItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const caseNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: EASE }}
      className="group relative overflow-hidden py-16 sm:py-24"
    >
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
        {/* Left Column: Browser-Framed Project Screenshot */}
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View ${project.title} case study`}
          className="block overflow-hidden rounded-sm border border-border bg-void/65 backdrop-blur-sm transition-colors duration-300 group-hover:border-border-strong"
        >
          {/* Minimalist browser chrome bar */}
          <div className="flex items-center justify-between border-b border-border bg-void/75 px-3.5 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
            </div>
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
              {project.demo ? project.demo.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.slug}
            </span>
            <span className="font-mono text-[10px] text-fog">{project.year}</span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div
                aria-hidden
                className="h-full w-full"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
              />
            )}
          </div>
        </Link>

        {/* Right Column: Case Number, Uppercase Title, Description, Tags & Actions */}
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            <span className="text-ivory">Case {caseNumber}</span>
            <span>·</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h3 className="mt-4 text-balance font-display text-2xl font-bold uppercase leading-[1.04] tracking-tight text-ivory sm:text-3xl lg:text-4xl">
            <Link
              to={`/projects/${project.slug}`}
              className="transition-colors duration-200 hover:text-mist"
            >
              {project.title}
            </Link>
          </h3>

          <p className="mt-4 text-justify text-sm leading-relaxed text-mist sm:text-base">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border bg-tint px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mist"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 6 && (
              <span className="rounded-sm border border-border bg-tint px-2.5 py-1 font-mono text-[10.5px] text-fog">
                +{project.tags.length - 6}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-5 w-full">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex min-h-10 items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:text-mist"
            >
              View Project
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live site`}
                className="inline-flex min-h-10 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-mist transition-colors hover:text-ivory"
              >
                Live Site <FiArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex min-h-10 items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-mist transition-colors hover:text-ivory"
              >
                <FiGithub className="h-3.5 w-3.5" /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
