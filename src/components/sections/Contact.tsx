import { motion } from "framer-motion";
import { Loader2, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/RevealText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Magnetic } from "@/components/shared/Magnetic";
import { useContactForm, HONEYPOT_FIELD } from "@/hooks/useContactForm";
import { PERSONAL, SOCIAL_LINKS } from "@/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const { formRef, status, message, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[160px]"
      />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something great."
          description="Have a role, a project, or just want to talk shop? My inbox is open."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn className="flex flex-col gap-6">
            <div className="glass-strong relative overflow-hidden rounded-3xl p-8">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/25 to-violet-500/25 blur-3xl"
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon-blue">
                Direct Contact
              </p>
              <a
                href={SOCIAL_LINKS.email}
                data-cursor="hover"
                className="mt-3 block text-balance font-display text-2xl font-medium text-ivory transition-colors hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-violet-400 sm:text-3xl"
              >
                {PERSONAL.email}
              </a>
              <div className="mt-6 flex items-start gap-2 text-sm text-mist">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fog" />
                <span className="text-balance">{PERSONAL.address}</span>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <Magnetic>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                  >
                    <FiGithub className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                  >
                    <FiLinkedin className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={SOCIAL_LINKS.email}
                    aria-label="Email"
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-ivory"
                  >
                    <FiMail className="h-4 w-4" />
                  </a>
                </Magnetic>
                {SOCIAL_LINKS.whatsapp && (
                  <Magnetic>
                    <a
                      href={`https://wa.me/${SOCIAL_LINKS.whatsapp.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist transition-colors hover:text-emerald-400"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>

            <div className="glass relative h-64 overflow-hidden rounded-3xl">
              <iframe
                title="Location map — Sri Gading, Batu Pahat, Johor"
                src="https://www.google.com/maps?q=Kampung+Seri+Bengkal,+Sri+Gading,+83300+Batu+Pahat,+Johor,+Malaysia&z=13&output=embed"
                className="h-full w-full grayscale invert-[92%] contrast-[1.05] hue-rotate-180"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </FadeIn>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="glass-strong rounded-3xl p-7 sm:p-9"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="user_name">Name</Label>
                <Input id="user_name" name="user_name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_email">Email</Label>
                <Input id="user_email" name="user_email" type="email" placeholder="you@email.com" required />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="What's this about?" required />
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell me about your project or opportunity…" required />
            </div>

            {/* Honeypot — off-screen rather than display:none, since some bots
                skip hidden fields. Never focusable, never announced. */}
            <input
              type="text"
              name={HONEYPOT_FIELD}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Magnetic>
                <Button type="submit" size="lg" disabled={status === "sending"} data-cursor="hover">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </Magnetic>

              {status !== "idle" && status !== "sending" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm ${
                    status === "success" ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  {message}
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
