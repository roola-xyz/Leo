import type { ReactNode } from "react";
import { Icon } from "../Icon";
import { cn } from "../../cn";

/**
 * The panel that drops from the app bar — the account menu, the apps
 * launcher — drawn the way Google's account panel is, because that is the one
 * every person who arrives here already knows how to read: a large rounded
 * sheet a shade below the page, a line across the top with the way out on the
 * right, and its contents as rounded cards.
 *
 * Shared so the two panels are one panel: the same corners, the same colour,
 * the same close button in the same place, so that somebody who has opened
 * one knows how the other works.
 */
export function PanelSurface({
  label,
  className,
  children,
}: {
  /** The accessible name of the panel. */
  label: string;
  /** Extra classes — see `panelClassName` on the menus. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      // Not role="menu": a menu may only contain menuitems, and these panels
      // hold settings, their option lists and tiles as well. It is a disclosure.
      aria-label={label}
      className={cn(
        "absolute right-0 z-50 mt-2 w-[min(26rem,calc(100vw-1rem))] overflow-hidden rounded-[28px]",
        "bg-surface-low text-on-surface shadow-lg ring-1 ring-outline-variant/40",
        className,
      )}
    >
      <div className="p-2">{children}</div>
    </div>
  );
}

/**
 * The line across the top of a panel: a title, or whatever the panel has to
 * say about itself, centred; and the way out on the right. The close button
 * is drawn even though a click outside closes the panel too, because on a
 * phone there is no outside.
 */
export function PanelTopLine({
  onClose,
  closeLabel,
  children,
}: {
  onClose: () => void;
  /** Translated by the caller, like everything else. */
  closeLabel: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative flex min-h-10 items-center justify-center px-12 py-1">
      {children}

      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        title={closeLabel}
        className="absolute top-1 right-1 flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
      >
        <Icon name="close" className="size-5" />
      </button>
    </div>
  );
}

/**
 * A card of rows. The rows sit a hairline apart on the panel's own colour,
 * which is what draws the card's dividers without a border anywhere, and the
 * first and last rows take the card's corners.
 */
export function PanelGroup({
  children,
  role,
  label,
  className,
}: {
  children: ReactNode;
  role?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      role={role}
      aria-label={label}
      className={cn("mt-2 flex flex-col gap-px overflow-hidden rounded-2xl first:mt-0", className)}
    >
      {children}
    </div>
  );
}
