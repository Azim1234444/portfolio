import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CERTIFICATIONS } from "@/data/certifications";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Certifications() {
  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Recognition"
          title="Certifications."
          description="Credentials earned through competitive programming and structured learning."
        />

        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:justify-start">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.a
              key={`${cert.title}-${cert.year}`}
              href={cert.image}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -8 }}
              className="group glass-strong relative w-full max-w-xs overflow-hidden rounded-3xl"
              data-cursor="hover"
              aria-label={`Open full-size ${cert.title} certificate (${cert.year})`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate, ${cert.issuer} ${cert.year}`}
                  loading="lazy"
                  className="w-full scale-100 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <ExternalLink className="h-4 w-4" />
                </span>
              </div>

              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon-blue">
                    {cert.category}
                  </p>
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-mist">
                    <BadgeCheck className="h-3 w-3 text-emerald-400" />
                    {cert.year}
                  </span>
                </div>
                <h3 className="mt-2 text-balance font-display text-xl font-medium leading-snug text-ivory">
                  {cert.title}
                </h3>
                <p className="mt-1.5 text-sm text-mist">{cert.issuer}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
