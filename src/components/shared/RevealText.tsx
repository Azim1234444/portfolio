import { createElement, Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealTextProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  by?: "word" | "line";
  once?: boolean;
}

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const child: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Splits text into words and reveals each with a clipped upward slide. */
export function RevealText({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const words = children.split(" ");

  return createElement(
    Tag,
    { className },
    <motion.span
      className="inline"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      custom={delay}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={child} className="inline-block will-change-transform">
              {word}
            </motion.span>
          </span>
          {i !== words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.span>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Generic fade + slide-up reveal for non-text content (cards, images, blocks). */
export function FadeIn({ children, className, delay = 0, y = 24, once = true }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
