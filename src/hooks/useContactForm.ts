import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { PERSONAL } from "@/constants";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Hidden field bots fill in and humans never see. Named to look tempting to a
 * scraper; a non-empty value means the submission is automated.
 */
export const HONEYPOT_FIELD = "company_website";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    if (!isConfigured) {
      setStatus("error");
      // Visitors must never be shown a developer TODO — point them at a channel
      // that actually works. The build-time flag is erased in production.
      setMessage(
        import.meta.env.DEV
          ? "Contact form isn't connected — add your EmailJS service, template and public key to .env"
          : `The message form is unavailable right now — please email me directly at ${PERSONAL.email}.`
      );
      return;
    }

    // Silently accept and discard bot submissions: reporting the rejection would
    // just tell the author how to get past it.
    if (new FormData(formRef.current).get(HONEYPOT_FIELD)) {
      setStatus("success");
      setMessage("Message sent — thanks for reaching out! I'll reply as soon as I can.");
      formRef.current.reset();
      return;
    }

    setStatus("sending");
    setMessage("");

    // Stamp {{time}} at submit, in the sender's own locale and timezone.
    const timeField = formRef.current.elements.namedItem("time");
    if (timeField instanceof HTMLInputElement) {
      timeField.value = new Date().toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }

    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus("success");
      setMessage("Message sent — thanks for reaching out! I'll reply as soon as I can.");
      formRef.current.reset();
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong sending your message. Please try again or email me directly.");
      console.error("EmailJS error:", err);
    }
  }

  return { formRef, status, message, handleSubmit, isConfigured };
}
