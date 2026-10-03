import { cn } from "../../cn";

export interface LanguageOption {
  value: string;
  label: string;
}

/**
 * The language picker, as a real `<select>` wearing a custom face.
 *
 * The native control is kept and made transparent over the top of the styled
 * row, rather than being replaced by a listbox built from divs. It is a dozen
 * options that will only grow, and the native one already brings keyboard
 * support, type-to-jump, and — the part a custom menu never gets right — the
 * platform's own full-screen picker on a phone. What is lost is control of how
 * the open list looks, which is not worth a reimplementation of a control the
 * browser ships.
 *
 * Presentational on purpose: the languages themselves and their translations
 * live together in the application, so there is one place to add a language
 * rather than two that can disagree.
 */
export function LanguageSelect({
  value,
  options,
  onChange,
  label,
  className,
}: {
  value: string;
  options: readonly LanguageOption[];
  onChange: (value: string) => void;
  /** The accessible name. Translated by the caller, like everything else. */
  label: string;
  className?: string;
}) {
  const current = options.find((option) => option.value === value);

  return (
    <div
      className={cn(
        "relative inline-flex h-8 items-center gap-1.5 rounded-full",
        "border border-outline-variant pr-2 pl-2.5 text-sm text-on-surface",
        "transition-colors hover:bg-primary/8",
        // The select underneath is transparent, so the focus ring has to be
        // drawn here or keyboard users get no indication of where they are.
        "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary",
        className,
      )}
    >
      <Globe />

      {/* The visible face. Hidden from assistive technology because the select
          over it already announces the same value. */}
      <span aria-hidden="true" className="max-w-44 truncate">
        {current?.label ?? value}
      </span>

      <Chevron />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="absolute inset-0 w-full cursor-pointer opacity-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Globe() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0 text-on-surface-variant"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
      {/* The meridians that make a plain circle read as a globe. */}
      <path d="M12 3a15 15 0 010 18a15 15 0 010-18z" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4 shrink-0 text-on-surface-variant"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
