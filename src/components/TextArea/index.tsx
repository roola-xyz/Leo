import type { TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../../cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * The outlined text field, grown a few lines.
 *
 * Field's trick of floating the label into the border notch does not transfer:
 * a textarea's content starts at the top, so there is nowhere for a
 * vertically-centred label to rest. The label therefore sits in the notch from
 * the outset, which is the M3 behaviour for a populated field and reads
 * correctly for one that is about to be.
 */
export function TextArea({ label, error, hint, className, rows = 6, ...props }: TextAreaProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="space-y-1">
      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          className={cn(
            "w-full rounded-field border bg-transparent px-4 pt-5 pb-3",
            "text-base text-on-surface transition-colors outline-none",
            // Vertical only. A textarea that can be dragged wider than its
            // column drags the layout with it.
            "resize-y",
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
            "pointer-events-none absolute top-1 left-3 bg-surface px-1 text-xs",
            error ? "text-error" : "text-on-surface-variant",
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
