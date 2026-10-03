import type { ReactNode } from "react";
import { cn } from "../../cn";

type Tone = "neutral" | "green" | "red" | "amber" | "blue";

/** M3 assist chips. */
const tones: Record<Tone, string> = {
  neutral: "bg-secondary-container text-on-secondary-container",
  green: "bg-success-container text-on-success-container",
  red: "bg-error-container text-on-error-container",
  amber: "bg-warning-container text-on-warning-container",
  blue: "bg-primary-container text-on-primary-container",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-lg px-2 text-xs font-medium",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
