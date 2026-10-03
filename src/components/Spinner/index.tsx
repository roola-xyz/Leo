import { cn } from "../../cn";

/**
 * A loading indicator with an accessible name.
 *
 * `role="status"` and the visually hidden label are what make this mean
 * something to a screen reader — a spinning SVG with no text announces nothing
 * at all, so the page simply appears to be empty.
 */
export function Spinner({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2", className)}>
      <svg className="size-5 animate-spin text-on-surface-variant" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
