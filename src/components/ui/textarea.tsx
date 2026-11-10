import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-36 w-full resize-none rounded-sm border border-border bg-tint px-4 py-3 text-sm text-ivory placeholder:text-fog transition-colors duration-200",
          "focus:border-ivory/60 focus:bg-tint-2",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory",
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
