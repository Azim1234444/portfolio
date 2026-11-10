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

  const lightboxImages = useMemo<LightboxImage[]>(() => {
    if (!project) return [];
    if (project.gallery?.length) return project.gallery;
    return project.image ? [{ src: project.image, caption: project.title }] : [];
  }, [project]);

  if (!project) return <Navigate to="/404" replace />;

  const caseNumber = String(index + 1).padStart(2, "0");
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const nextNumber = String(((index + 1) % PROJECTS.length) + 1).padStart(2, "0");
  const coverIndex = Math.max(
    0,
    lightboxImages.findIndex((shot) => shot.src === project.image)
  );

  return (
    <article className="relative min-h-svh pb-28 pt-28 sm:pt-36">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            to="/#projects"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Back to selected work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-8 border-b border-border pb-8"
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-fog">
            <span className="text-ivory">Case {caseNumber}</span>
            <span>·</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="relative mt-10 overflow-hidden rounded-sm border border-border bg-surface"
        >
          <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
              <span className="h-2 w-2 rounded-full bg-ivory/25" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
              {project.demo ?? project.slug}
            </span>
            <span className="font-mono text-[10px] text-fog">Preview</span>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {project.image ? (
              <button
                type="button"
                onClick={() => setLightboxIndex(coverIndex)}
                aria-label={`View ${project.title} images full size`}
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
                  className="absolute bottom-4 right-4 flex items-center gap-2 rounded-sm border border-border-strong bg-void/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ivory opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Expand className="h-3.5 w-3.5" /> Expand View
                </span>
              </button>
            ) : (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
              />
            )}
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-fog">Overview</p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-4 text-justify text-lg leading-relaxed text-mist"
            >
              {project.description}
            </motion.p>

            <div className="mt-12 border-t border-border pt-10">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ivory">
                Key Deliverables &amp; Highlights
              </h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                    className="flex items-start gap-3.5 py-3.5 text-justify text-sm leading-relaxed text-mist sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ivory" />
                    <span>{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.demo && (
                <Magnetic strength={0.25}>
                  <Button asChild variant="primary">
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <FiArrowUpRight className="h-4 w-4" /> Visit Live Site
                    </a>
                  </Button>
                </Magnetic>
              )}
              {project.github && (
                <Magnetic strength={0.25}>
                  <Button asChild variant="outline">
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <FiGithub className="h-4 w-4" /> View Source Code
                    </a>
                  </Button>
                </Magnetic>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-sm border border-border bg-surface p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              Technology Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border bg-tint px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-mist"
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-20 border-t border-border pt-14">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ivory">
                System Screens &amp; Gallery
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                Select any screen to inspect full size
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((shot, i) => (
                <motion.figure
                  key={shot.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
                  className="group overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-border-strong"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View full size: ${shot.caption}`}
                    className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-ink"
                  >
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-void/85 text-ivory">
                        <Expand className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                  <figcaption className="border-t border-border px-5 py-3.5 font-mono text-xs text-mist">
                    <span className="mr-2 text-fog">{String(i + 1).padStart(2, "0")}</span>
                    {shot.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 border-t border-border pt-12">
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-fog">
                Next Case · {nextNumber}
              </p>
              <p className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-ivory transition-colors group-hover:text-mist sm:text-4xl">
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
