import { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Lightbox, type LightboxImage } from "@/components/shared/Lightbox";
import feedbackOne from "@/assets/images/customer-feedback-01.jpg";
import feedbackTwo from "@/assets/images/customer-feedback-02.jpg";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEEDBACK = [
  {
    image: feedbackOne,
    quote: "Alhamdulillah saya puas hati semua",
    context: "Website Delivery",
    caption: "Customer feedback shared after a completed website delivery",
  },
  {
    image: feedbackTwo,
    quote: "Terima kasih banyak2 bos",
    context: "Digital Service Delivery",
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
    <section id="customer-feedback" className="relative border-b border-border py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Client Proof"
          title="Customer Feedback"
          description="Direct messages shared by clients after completed deliveries. Personal and transaction details remain redacted for privacy."
        />

        <div className="mt-16 grid grid-cols-1 border-l border-t border-border md:grid-cols-2">
          {FEEDBACK.map((feedback, index) => {
            const num = String(index + 1).padStart(2, "0");
            return (
              <motion.article
                key={feedback.image}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
                className="flex flex-col justify-between border-b border-r border-border bg-void p-6 sm:p-9"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-fog">
                    <span>Feedback {num}</span>
                    <span>{feedback.context}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative block w-full overflow-hidden rounded-sm border border-border bg-surface text-left transition-colors hover:border-border-strong"
                    aria-label={`Open full-size feedback screenshot ${index + 1}`}
                  >
                    <img
                      src={feedback.image}
                      alt={feedback.caption}
                      loading="lazy"
                      className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <span
                      aria-hidden
                      className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-sm border border-border-strong bg-void/85 text-ivory backdrop-blur transition-transform duration-300 group-hover:scale-105"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>
                </div>

                <div className="mt-7 border-t border-border pt-6">
                  <blockquote className="text-balance font-display text-xl font-bold uppercase leading-snug tracking-tight text-ivory sm:text-2xl">
                    “{feedback.quote}”
                  </blockquote>
                  <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-[0.16em] text-fog">
                    <span className="text-mist">Verified Client · WhatsApp</span>
                    <span>Malaysia</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
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
