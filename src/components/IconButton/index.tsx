import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "../Icon";
import { cn } from "../../cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /**
   * Required, not optional. A button whose only content is a picture has no
   * accessible name at all without one, and "optional label" is how that ends up
   * shipping.
   */
  label: string;
  size?: "sm" | "md";
  active?: boolean;
}

export function IconButton({
  icon,
  label,
  size = "md",
  active = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors",
        "text-on-surface hover:bg-surface-high active:bg-surface-high",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-38",
        size === "sm" ? "size-9" : "size-10",
        active && "bg-surface-high",
        className,
      )}
      {...props}
    >
      <Icon name={icon} className={size === "sm" ? "size-5" : "size-6"} />
    </button>
  );
}
