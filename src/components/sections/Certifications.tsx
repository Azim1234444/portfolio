import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CERTIFICATIONS } from "@/data/certifications";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const visibleCertifications = showAll ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 6);

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Recognition"
          title="Certifications."
          description="Completed courses in AI, cybersecurity, cloud computing, digital transformation, and more."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCertifications.map((cert, i) => (
            <motion.article
              key={`${cert.title}-${cert.year}`}
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: Math.min(i, 5) * 0.08, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="glass-strong relative min-w-0 overflow-hidden rounded-3xl"
            >
              <a
                href={cert.certificateUrl ?? cert.image}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-neon-blue"
                data-cursor="hover"
                aria-label={`Open ${cert.title} certificate (${cert.year})`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate, ${cert.issuer} ${cert.year}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>

                <div className="relative p-6 pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-blue">
                      {cert.category}
                    </p>
                    <span className="flex items-center gap-1 rounded-full border border-border bg-tint px-2.5 py-1 font-mono text-[11px] text-mist">
                      <BadgeCheck className="h-3 w-3 text-emerald-400" />
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="mt-2 text-balance font-display text-xl font-medium leading-snug text-ivory">
                    {cert.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-mist">{cert.issuer}</p>
                </div>
              </a>
              {cert.certificateUrl && cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-6 mb-6 inline-flex items-center gap-1.5 text-sm text-neon-blue underline-offset-4 hover:underline focus-visible:underline"
                >
                  Verify on Coursera <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              )}
            </motion.article>
          ))}
        </div>
        {CERTIFICATIONS.length > 6 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
              className="rounded-full border border-border-strong bg-tint-2 px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-tint-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-blue"
            >
              {showAll ? "Show fewer certifications" : `View all ${CERTIFICATIONS.length} certifications`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
