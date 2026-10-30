import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill buttons, like the original site's lime and indigo pills.
 * The lime CTA keeps the original's darker "lip" along the bottom edge (a flat offset, not a glow).
 */
export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-semibold tracking-[0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Primary CTA: lime with navy text. */
        default:
          "bg-accent text-accent-foreground shadow-[0_4px_0_0_hsl(var(--accent-deep))] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_hsl(var(--accent-deep))] active:translate-y-1 active:shadow-[0_0_0_0_hsl(var(--accent-deep))]",
        /** Indigo pill, the original "Subscribe" button. */
        secondary:
          "bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(var(--secondary))] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_hsl(var(--secondary))] active:translate-y-1 active:shadow-none",
        /** Outlined, for light backgrounds. */
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        /** Outlined, for navy/dark backgrounds and photos. */
        "outline-light":
          "border-2 border-white/80 bg-transparent text-white hover:border-white hover:bg-white hover:text-secondary",
        /** White pill for dark backgrounds. */
        light: "bg-white text-secondary hover:-translate-y-0.5 hover:bg-indigo-soft",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        link: "rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-11 px-5 text-sm",
        default: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "size-11",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

/**
 * Use for links that look like buttons:
 *   <Link href="/join" className={buttonVariants({ size: "lg" })}>Join</Link>
 */
