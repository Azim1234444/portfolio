import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  /** Delay (ms) after `enabled` becomes true before typing starts. */
  startDelay?: number;
  /** Typing stays paused (and idle) until this is true — e.g. until a loader finishes. */
  enabled?: boolean;
}

export function useTypewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseDuration = 1800,
  startDelay = 0,
  enabled = true,
}: UseTypewriterOptions) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "pausing" | "deleting">("idle");

  // Kick off once `enabled` flips true (e.g. once the loading screen finishes).
  useEffect(() => {
    if (!enabled) return;
    const t = window.setTimeout(() => setPhase("typing"), startDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (phase === "idle") return;

    const currentWord = words[wordIndex % words.length];
    let timeout: number;

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeout = window.setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typingSpeed);
      } else {
        timeout = window.setTimeout(() => setPhase("pausing"), pauseDuration);
      }
    } else if (phase === "pausing") {
      timeout = window.setTimeout(() => setPhase("deleting"), 300);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = window.setTimeout(() => setText(currentWord.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
