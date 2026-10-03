import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../cn";

/**
 * Material 3 button variants, in descending order of emphasis. Having them named
 * by emphasis rather than by colour is what keeps one primary action per view.
 */
type Variant = "filled" | "tonal" | "outlined" | "text";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  filled: "bg-primary text-on-primary hover:brightness-110 active:brightness-95",
  tonal:
    "bg-secondary-container text-on-secondary-container hover:brightness-105 active:brightness-95",
  outlined:
    "border border-outline text-primary hover:bg-primary/8 active:bg-primary/12",
  text: "text-primary hover:bg-primary/8 active:bg-primary/12",
};

export function Button({
  variant = "filled",
  loading = false,
  icon,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      // A button mid-request must not be clickable again, so `loading` disables
      // it rather than only changing how it looks.
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        // Fully rounded, 40px tall: the M3 button shape.
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-6",
        "text-sm font-medium tracking-[0.00714em] transition-all",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-38",
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading ? (
        <svg className="size-4 shrink-0 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
          />
        </svg>
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
