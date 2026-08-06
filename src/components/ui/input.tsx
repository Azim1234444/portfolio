import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-13 w-full rounded-xl border border-border bg-tint px-4 py-3 text-sm text-ivory placeholder:text-fog transition-colors duration-200",
          // A border tint alone is too weak to signal focus (WCAG 2.4.7), so keep
          // a real ring. `outline-none` here would cancel the global :focus-visible.
          "focus:border-neon-blue/60 focus:bg-tint-2",
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
Input.displayName = "Input";

export { Input };
