import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
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
  const waHref = SOCIAL_LINKS.whatsapp
    ? `https://wa.me/${SOCIAL_LINKS.whatsapp.replace(/[^\d]/g, "")}`
    : undefined;

  return (
    <section id="contact" className="relative overflow-hidden border-b border-border py-28 sm:py-36">
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Centered High-Impact Closing Banner inspired by reference */}
        <FadeIn className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-fog">
            Next Step · Available for Projects &amp; Roles
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-ivory">
            BUILT TO PERFORM.
            <span className="mt-1 block text-ivory/90">READY TO SHIP.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-mist sm:text-lg">
            Have a software engineering role, a business system, or a custom website in mind? Reach out directly or send a project brief below.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            {waHref && (
              <Magnetic strength={0.25}>
                <Button asChild size="lg" variant="primary">
                  <a href={waHref} target="_blank" rel="noreferrer">
                    <FaWhatsapp className="h-4 w-4" /> Start on WhatsApp
                  </a>
                </Button>
              </Magnetic>
            )}
            <Magnetic strength={0.25}>
              <Button asChild size="lg" variant="outline">
                <a href={SOCIAL_LINKS.email}>
                  <FiMail className="h-4 w-4" /> Email Directly
                </a>
              </Button>
            </Magnetic>
          </div>
        </FadeIn>

        {/* Architectural 2-Column Direct Contact & Form Ledger */}
        <div className="mt-20 grid grid-cols-1 border border-border bg-void/65 backdrop-blur-sm lg:grid-cols-[0.42fr_0.58fr]">
          {/* Left Column: Direct Channels */}
          <div className="flex flex-col justify-between border-b border-border p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-fog">
                01 · Direct Channels
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-ivory">
                Get In Touch
              </h3>
              <p className="mt-2.5 text-justify text-sm leading-relaxed text-mist">
                Prefer direct communication? Connect via email, WhatsApp, or professional networks.
              </p>

              <div className="mt-8 divide-y divide-border border-y border-border font-mono text-xs">
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex items-center justify-between py-4 text-mist transition-colors hover:text-ivory"
                >
                  <span className="uppercase tracking-[0.16em] text-fog">Email</span>
                  <span className="inline-flex items-center gap-1.5 text-ivory">
                    {PERSONAL.email} <FiArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>

                {waHref && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between py-4 text-mist transition-colors hover:text-ivory"
                  >
                    <span className="uppercase tracking-[0.16em] text-fog">WhatsApp</span>
                    <span className="inline-flex items-center gap-1.5 text-ivory">
                      +60 16-349 5594 <FiArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                )}

                <div className="flex items-center justify-between py-4">
                  <span className="uppercase tracking-[0.16em] text-fog">Location</span>
                  <span className="text-mist">{PERSONAL.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <Magnetic strength={0.3}>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-tint text-mist transition-colors hover:border-ivory hover:text-ivory"
                >
                  <FiGithub className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-tint text-mist transition-colors hover:border-ivory hover:text-ivory"
                >
                  <FiLinkedin className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={SOCIAL_LINKS.email}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-tint text-mist transition-colors hover:border-ivory hover:text-ivory"
                >
                  <FiMail className="h-4 w-4" />
                </a>
              </Magnetic>
              {waHref && (
                <Magnetic strength={0.3}>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-tint text-mist transition-colors hover:border-ivory hover:text-ivory"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>

          {/* Right Column: EmailJS Form (Preserving exact field names: name, email, title, message, time) */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="p-7 sm:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-fog">
              02 · Send a Message
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="contact-title">Subject</Label>
              <Input id="contact-title" name="title" placeholder="What's this about?" required />
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project or opportunity…"
                required
              />
            </div>

            <input type="hidden" name="time" />

            <input
              type="text"
              name={HONEYPOT_FIELD}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Magnetic strength={0.25}>
                <Button type="submit" size="lg" variant="primary" disabled={status === "sending"}>
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
