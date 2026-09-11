import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Quote } from "lucide-react";
import { FadeIn, RevealText } from "@/components/shared/RevealText";
import { Lightbox, type LightboxImage } from "@/components/shared/Lightbox";
import feedbackOne from "@/assets/images/customer-feedback-01.jpg";
import feedbackTwo from "@/assets/images/customer-feedback-02.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEEDBACK = [
  {
    image: feedbackOne,
    quote: "Alhamdulillah saya puas hati semua",
    context: "Website delivery",
    caption: "Customer feedback shared after a completed website delivery",
  },
  {
    image: feedbackTwo,
    quote: "Terima kasih banyak2 bos",
    context: "Digital service delivery",
    caption: "Customer appreciation shared after a completed digital service",
  },
];

const LIGHTBOX_IMAGES: LightboxImage[] = FEEDBACK.map(({ image, caption }) => ({
  src: image,
  caption,
}));

export function CustomerFeedback() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="customer-feedback" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute left-0 top-1/3 h-[min(460px,55vh)] w-[min(720px,90vw)] -translate-x-1/3 rounded-full bg-blue-500/[0.06] blur-[100px] sm:blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <RevealText
          as="h2"
          className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl"
        >
          Customer feedback.
        </RevealText>

        <FadeIn delay={0.15}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            Real messages shared after completed work. Personal and transaction details remain hidden.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:gap-14">
          {FEEDBACK.map((feedback, index) => (
            <motion.article
              key={feedback.image}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.75, delay: index * 0.12, ease: EASE }}
              className={index === 1 ? "md:mt-20" : ""}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="glass-strong group relative block w-full overflow-hidden rounded-3xl p-2 text-left"
                aria-label={`Open full-size feedback screenshot ${index + 1}`}
                data-cursor="hover"
              >
                <span className="block overflow-hidden rounded-[1.15rem] bg-surface-2">
                  <img
                    src={feedback.image}
                    alt={feedback.caption}
                    loading="lazy"
                    className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>

              <div className="mt-6 flex gap-4 px-2 sm:px-4">
                <Quote className="mt-1 h-5 w-5 shrink-0 text-neon-blue" aria-hidden />
                <div>
                  <blockquote className="text-balance font-display text-xl font-medium leading-snug text-ivory sm:text-2xl">
                    “{feedback.quote}”
                  </blockquote>
                  <p className="mt-3 text-sm text-mist">Customer via WhatsApp</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                    {feedback.context}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Lightbox
        images={LIGHTBOX_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
