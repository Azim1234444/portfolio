import { useRef, useState, type FormEvent } from "react";
import { PERSONAL } from "@/constants";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Hidden field bots fill in and humans never see. Named to look tempting to a
 * scraper; a non-empty value means the submission is automated.
 */
export const HONEYPOT_FIELD = "company_website";

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isConfigured = true;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Silently accept and discard bot submissions: reporting the rejection would
    // just tell the author how to get past it.
    if (formData.get(HONEYPOT_FIELD)) {
      setStatus("success");
      setMessage("Message sent — thanks for reaching out! I'll reply as soon as I can.");
      formRef.current.reset();
      return;
    }

    setStatus("sending");
    setMessage("");

    const time = new Date().toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      title: String(formData.get("title") ?? ""),
      message: String(formData.get("message") ?? ""),
      time,
      [HONEYPOT_FIELD]: String(formData.get(HONEYPOT_FIELD) ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(
          data.error || `Unable to send right now — please email me directly at ${PERSONAL.email}.`
        );
      }

      setStatus("success");
      setMessage("Message sent — thanks for reaching out! I'll reply as soon as I can.");
      formRef.current.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : `Something went wrong sending your message. Please email me directly at ${PERSONAL.email}.`
      );
      console.error("Contact form error:", err);
    }
  }

  return { formRef, status, message, handleSubmit, isConfigured };
}
