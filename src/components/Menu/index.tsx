import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "../Icon";
import { cn } from "../../cn";

/**
 * A dropdown anchored to whatever opened it.
 *
 * Hand-built rather than pulled in, because the whole of what a menu owes you is
 * short and the parts that are usually skipped are the parts that matter:
 *
 *   - Escape closes it, and returns focus to the trigger. Somebody who opened
 *     this from the keyboard has to be able to get back out to where they were.
 *   - A click anywhere else closes it, including on another menu's trigger.
 *   - `aria-expanded` and `aria-haspopup` on the trigger, so it is announced as
 *     a menu rather than as a button that mysteriously changes the page.
 *
 * It does not implement arrow-key roving focus. The items are ordinary buttons
 * and links in DOM order, so Tab already walks them in the order they are read;
 * adding a second, different keyboard model would be worse than not having one.
 */
export function Menu({
  trigger,
  align = "end",
  children,
  className,
}: {
  /** Rendered inside the trigger button. */
  trigger: ReactNode;
  align?: "start" | "end";
  children: ReactNode | ((close: () => void) => ReactNode);
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        // Back to the trigger, not to the top of the document.
        triggerRef.current?.focus();
      }
    }

    // `pointerdown` rather than `click`: a click fires after the press, which is
    // late enough that pressing another menu's trigger would open that one and
    // then be closed again by this handler.
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={container} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((was) => !was)}
        className="flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {trigger}
      </button>

      {open && (
        <div
          id={id}
          role="menu"
          className={cn(
            "absolute top-full z-50 mt-2 min-w-64 overflow-hidden rounded-field border border-outline-variant",
            "bg-surface py-2 shadow-lg shadow-black/20",
            align === "end" ? "right-0" : "left-0",
            className,
          )}
        >
          {typeof children === "function" ? children(close) : children}
        </div>
      )}
    </div>
  );
}

/**
 * One row. A button by default, or a link when `href` is given — the difference
 * matters to anybody middle-clicking, and to a screen reader announcing what
 * will happen.
 */
export function MenuItem({
  icon,
  href,
  target,
  rel,
  onClick,
  selected,
  danger = false,
  children,
}: {
  icon?: IconName;
  href?: string;
  /** With `href`: where it opens — "_blank" for a link that leaves the site. */
  target?: string;
  rel?: string;
  onClick?: () => void;
  /** Renders a tick, and marks the row as the chosen one of a set. */
  selected?: boolean;
  danger?: boolean;
  children: ReactNode;
}) {
  const className = cn(
    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
    "hover:bg-surface-high focus-visible:bg-surface-high focus-visible:outline-none",
    danger ? "text-error" : "text-on-surface",
  );

  const content = (
    <>
      {icon && <Icon name={icon} className="size-5 text-on-surface-variant" />}
      <span className="flex-1 truncate">{children}</span>
      {selected !== undefined && (
        // A fixed-width slot whether or not it is ticked, so the labels of a set
        // of options line up instead of shifting by the width of a tick.
        <span className="w-5 shrink-0">
          {selected && <Icon name="check" className="size-5 text-primary" />}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        role="menuitem"
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      role={selected !== undefined ? "menuitemradio" : "menuitem"}
      aria-checked={selected}
      type="button"
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
}

export function MenuSeparator() {
  return <hr className="my-2 border-outline-variant" />;
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-4 pt-1 pb-2 text-xs font-medium tracking-wide text-on-surface-variant uppercase">
      {children}
    </p>
  );
}
