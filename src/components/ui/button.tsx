import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_30px_-8px_rgba(79,156,255,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_10px_40px_-6px_rgba(168,85,247,0.75)] hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "glass text-ivory hover:border-border-strong hover:bg-tint-3 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "text-mist hover:text-ivory hover:bg-tint-2",
        link: "text-neon-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
