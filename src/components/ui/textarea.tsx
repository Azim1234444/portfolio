import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-36 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ivory placeholder:text-fog transition-colors duration-200",
          // See Input: the ring must survive, or keyboard users lose the field.
          "focus:border-neon-blue/60 focus:bg-white/[0.06]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-blue",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
