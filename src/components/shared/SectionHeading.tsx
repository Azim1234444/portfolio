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
        <p
          className={cn(
            "mb-4 font-mono text-xs uppercase tracking-[0.22em] text-fog",
            align === "center" && "mx-auto"
          )}
        >
          {eyebrow}
        </p>
      </FadeIn>

      <RevealText
        as="h2"
        className="text-balance font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-ivory sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </RevealText>

      {description && (
        <FadeIn delay={0.15}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-mist sm:text-lg",
              align === "center" ? "mx-auto text-center" : "text-justify"
            )}
          >
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
