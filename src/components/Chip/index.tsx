import type { ReactNode } from "react";
import { cn } from "../../cn";

/**
 * A filter pill, as in the row above a feed.
 *
 * Rendered as a real radio group by the caller — these are one choice from a
 * set, not a row of independent toggles, and building them out of buttons is
 * how a keyboard user ends up tabbing through fifteen filters to reach the
 * grid.
 */
export function Chip({
  selected = false,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "h-8 shrink-0 rounded-lg px-3 text-sm font-medium whitespace-nowrap transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        /*
         * Selected is inverted, not merely tinted.
         *
         * It used to be `secondary-container` against `surface-container`, which
         * in the light theme is #e9eef6 against #f0f4f9 — three points apart,
         * indistinguishable at a glance and invisible to anybody who does not
         * see that difference at all. Which chip is active is the entire content
         * of a filter row.
         *
         * Inverting through `on-surface`/`surface` rather than reaching for the
         * accent: the row is navigation between equals, and painting the active
         * one in the brand colour would make it read as the important category
         * rather than the chosen one. It also inverts correctly in both themes
         * for free, dark-on-light and light-on-dark.
         */
        selected
          ? "bg-on-surface text-surface"
          : "bg-surface-container text-on-surface hover:bg-surface-high",
      )}
    >
      {children}
    </button>
  );
}
