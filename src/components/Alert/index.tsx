import type { ReactNode } from "react";
import { cn } from "../../cn";

type Tone = "error" | "success" | "info" | "warning";

/** Tonal containers, so a message reads as informational rather than alarming. */
const tones: Record<Tone, string> = {
  error: "bg-error-container text-on-error-container",
  success: "bg-success-container text-on-success-container",
  info: "bg-primary-container text-on-primary-container",
  warning: "bg-warning-container text-on-warning-container",
};

export function Alert({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div
      // Errors are announced immediately; anything else waits for a pause so a
      // success note does not interrupt whatever is being read.
      role={tone === "error" ? "alert" : "status"}
      className={cn("rounded-field px-4 py-3 text-sm leading-5", tones[tone])}
    >
      {children}
    </div>
  );
}
