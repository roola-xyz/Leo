import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../../cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

/**
 * A native `<select>` in an outlined field.
 *
 * Native, and deliberately not a listbox built out of divs. This is a form that
 * has to work for somebody who is already having a bad day, possibly on a phone,
 * possibly with a screen reader — and the platform control is the one that
 * already works with every assistive technology, opens as a wheel on iOS, and
 * responds to typing the first letter of an option. A custom one would look more
 * like the rest of the page and behave worse.
 */
export function Select({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-1">
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            "h-14 w-full appearance-none rounded-field border bg-transparent px-4 pt-4",
            "text-base text-on-surface transition-colors outline-none",
            error
              ? "border-error focus:border-error"
              : "border-outline focus:border-primary focus:border-2",
            className,
          )}
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute top-1 left-3 bg-surface px-1 text-xs",
            error ? "text-error" : "text-on-surface-variant",
          )}
        >
          {label}
        </label>

        {/* appearance-none removed the platform arrow, so one is drawn back. */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-on-surface-variant"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {hint && !error && (
        <p id={hintId} className="px-4 text-xs text-on-surface-variant">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="px-4 text-xs font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
