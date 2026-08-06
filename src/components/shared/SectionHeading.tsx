import { RevealText, FadeIn } from "@/components/shared/RevealText";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <FadeIn>
        <div
          className={cn(
            "mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5",
            align === "center" && "mx-auto"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 shadow-[0_0_10px_2px_rgba(79,156,255,0.6)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist">
            {eyebrow}
          </span>
        </div>
      </FadeIn>

      <RevealText
        as="h2"
        className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl"
      >
        {title}
      </RevealText>

      {description && (
        <FadeIn delay={0.15}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
