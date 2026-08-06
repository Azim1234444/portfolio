import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Expand } from "lucide-react";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/shared/Magnetic";
import { Lightbox, type LightboxImage } from "@/components/shared/Lightbox";
import { PROJECTS } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Every image this project can show, in gallery order. The cover falls back to
  // its own entry when it isn't already one of the gallery shots.
  const lightboxImages = useMemo<LightboxImage[]>(() => {
    if (!project) return [];
    if (project.gallery?.length) return project.gallery;
    return project.image ? [{ src: project.image, caption: project.title }] : [];
  }, [project]);

  if (!project) return <Navigate to="/404" replace />;

  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const coverIndex = Math.max(
    0,
    lightboxImages.findIndex((shot) => shot.src === project.image)
  );

  return (
    <article className="relative min-h-svh pb-28 pt-32 sm:pt-36">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20 mask-fade-bottom" />
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            to="/#projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-mist transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border bg-tint px-3 py-1 font-mono text-xs text-neon-blue">
              {project.category}
            </span>
            <span className="font-mono text-xs text-fog">{project.year}</span>
          </div>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold tracking-tight text-ivory sm:text-6xl">
            {project.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative mt-10 aspect-[16/8] overflow-hidden rounded-3xl"
        >
          {project.image ? (
            <button
              type="button"
              onClick={() => setLightboxIndex(coverIndex)}
              aria-label={`View ${project.title} images full size`}
              data-cursor="hover"
              className="group absolute inset-0 h-full w-full cursor-zoom-in"
            >
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30"
              />
              <span
                aria-hidden
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-border-strong bg-black/50 px-3 py-1.5 font-mono text-[11px] text-ivory opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
              >
                <Expand className="h-3.5 w-3.5" /> View full size
              </span>
            </button>
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
            </>
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-balance text-lg leading-relaxed text-mist"
            >
              {project.description}
            </motion.p>

            <div className="mt-10">
              <h2 className="font-display text-xl font-medium text-ivory">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                    className="flex items-start gap-3 text-mist"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-blue" />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.github && (
                <Magnetic>
                  <Button asChild variant="outline">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FiGithub className="h-4 w-4" /> View Code
                    </a>
                  </Button>
                </Magnetic>
              )}
              {project.demo && (
                <Magnetic>
                  <Button asChild variant="primary">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <FiArrowUpRight className="h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </Magnetic>
              )}
            </div>
          </div>

          <aside className="glass h-fit rounded-3xl p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              Tech Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-tint px-3 py-1 font-mono text-[11px] text-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-medium text-ivory">Gallery</h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                Tap an image to view full size
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((shot, i) => (
                <motion.figure
                  key={shot.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="group glass overflow-hidden rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View full size: ${shot.caption}`}
                    data-cursor="hover"
                    className="relative block aspect-[16/11] w-full cursor-zoom-in overflow-hidden"
                  >
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-400 group-hover:bg-black/35 group-hover:opacity-100"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-black/50 text-ivory backdrop-blur">
                        <Expand className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                  <figcaption className="px-5 py-4 text-sm text-mist">{shot.caption}</figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 border-t border-border pt-10">
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                Next project
              </p>
              <p className="mt-2 font-display text-2xl font-medium text-ivory transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-violet-400 sm:text-3xl">
                {next.title}
              </p>
            </div>
            <ArrowRight className="h-6 w-6 shrink-0 text-mist transition-transform group-hover:translate-x-2 group-hover:text-ivory" />
          </Link>
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </article>
  );
}
