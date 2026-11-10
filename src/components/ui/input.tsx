import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-sm border border-border bg-tint px-4 py-3 text-sm text-ivory placeholder:text-fog transition-colors duration-200",
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
Input.displayName = "Input";

export { Input };
