import { useEffect, useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/utils/gsap";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import type { ProjectItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 22 });
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  useEffect(() => {
    if (isTouch || !visualRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [isTouch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: EASE }}
      className={project.featured ? "sm:col-span-2 lg:col-span-1" : ""}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: isTouch ? 0 : rotateX, rotateY: isTouch ? 0 : rotateY, transformPerspective: 900 }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl"
        data-cursor="hover"
      >
        <div ref={visualRef} className="relative aspect-[16/11] w-full overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-110 object-cover object-top transition-transform duration-700 group-hover:scale-100"
            />
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0 scale-110 transition-transform duration-700 group-hover:scale-100"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
            </>
          )}
          {/* Screenshots are busy, so they need a heavier scrim than the flat gradients
              to keep the title and badges legible. */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-t",
              project.image
                ? "from-black via-black/55 to-black/25"
                : "from-black/70 via-black/10 to-transparent"
            )}
          />

          {!isTouch && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(220px circle at ${glareX} ${glareY}, rgba(255,255,255,0.25), transparent 70%)`,
              }}
            />
          )}

          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
            {project.category}
          </span>
          <span className="absolute right-5 top-5 font-mono text-[11px] text-white/70">
            {project.year}
          </span>

          <h3 className="absolute bottom-5 left-5 right-5 font-display text-2xl font-medium text-white drop-shadow-lg sm:text-[1.65rem]">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="line-clamp-3 text-sm leading-relaxed text-mist">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-mist"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10.5px] text-fog">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-white/25 hover:text-ivory"
              >
                <FiGithub className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-white/25 hover:text-ivory"
              >
                <FiArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="ml-auto flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium text-ivory transition-colors hover:text-neon-blue"
            >
              Read More
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
