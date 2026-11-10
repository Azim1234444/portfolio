import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm font-display text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ivory text-void border border-ivory hover:bg-ivory/90 active:scale-[0.99]",
        outline:
          "border border-border-strong bg-void/60 text-ivory hover:border-ivory hover:bg-tint-2 active:scale-[0.99]",
        ghost: "text-mist hover:text-ivory hover:bg-tint-2",
        link: "text-ivory underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-[11px]",
        lg: "h-14 px-9 text-xs sm:text-[13px]",
        icon: "h-11 w-11 rounded-sm",
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
