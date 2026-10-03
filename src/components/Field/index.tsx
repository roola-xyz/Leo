import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../../cn";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * A Material 3 outlined text field.
 *
 * The label sits in a notch on the border rather than floating on submit, which
 * keeps it readable at all times — a placeholder-only field loses its label the
 * moment someone starts typing, which is exactly when they may need it.
 */
export function Field({ label, error, hint, className, ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          // Pointing the input at its own error and hint is what lets a screen
          // reader say why a field was rejected, rather than just "invalid".
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            "peer h-14 w-full rounded-field border bg-transparent px-4 pt-4",
            "text-base text-on-surface transition-colors outline-none",
            "placeholder:text-transparent",
            error
              ? "border-error focus:border-error"
              : "border-outline focus:border-primary focus:border-2",
            className,
          )}
          {...props}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-3 px-1 transition-all",
            // Sits in the border notch when the field has content or focus, and
            // drops to the middle of the field when it is empty and unfocused.
            "top-1 text-xs",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
            "peer-focus:top-1 peer-focus:text-xs",
            // Matches the Card these always sit inside, so the label reads as a
            // notch in the border rather than a mismatched patch over it.
            "bg-surface",
            error ? "text-error" : "text-on-surface-variant peer-focus:text-primary",
          )}
        >
          {label}
        </label>
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
