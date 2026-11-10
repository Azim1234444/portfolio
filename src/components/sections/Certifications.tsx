import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { CERTIFICATIONS } from "@/data/certifications";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Certifications() {
  const [showAll, setShowAll] = useState(false);
  const reduceMotion = useReducedMotion();
  const visibleCertifications = showAll ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 6);

  return (
    <section id="certifications" className="relative border-b border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Recognition"
          title="Certifications & Credentials"
          description="Verified coursework and industry credentials across artificial intelligence, cybersecurity, cloud infrastructure, and programming."
        />

        <div className="mt-16 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {visibleCertifications.map((cert, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isCoursera = cert.credentialUrl?.includes("coursera.org");

            return (
              <motion.article
                key={`${cert.title}-${cert.year}`}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: Math.min(i, 5) * 0.07, ease: EASE }}
                className="group flex flex-col justify-between border-b border-r border-border bg-void/65 backdrop-blur-sm transition-colors duration-300 hover:bg-void/80"
              >
                <a
                  href={cert.certificateUrl ?? cert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ivory"
                  aria-label={`Open ${cert.title} certificate (${cert.year})`}
                >
                  {/* Top metadata bar */}
                  <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                    <span>
                      {num} · {cert.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-mist">
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
                      {cert.year}
                    </span>
                  </div>

                  {/* Certificate document preview */}
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-white p-3">
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate, ${cert.issuer} ${cert.year}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-void/85 text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="p-6 pb-4">
                    <h3 className="text-balance font-display text-lg font-bold uppercase leading-snug tracking-tight text-ivory">
                      {cert.title}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs text-mist">{cert.issuer}</p>
                  </div>
                </a>

                <div className="flex items-center justify-between border-t border-border px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em]">
                  <a
                    href={cert.certificateUrl ?? cert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-mist transition-colors hover:text-ivory"
                  >
                    View Certificate <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ivory underline-offset-4 hover:underline"
                    >
                      {isCoursera ? "Verify Coursera" : "Verify Credential"}{" "}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {CERTIFICATIONS.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
            >
              {showAll
                ? "Show Fewer Certifications"
                : `View All ${CERTIFICATIONS.length} Certifications`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
