import { cn } from "../../cn";
import { useLeoTranslations, type LeoKey } from "../../i18n/messages";

export type Theme = "system" | "light" | "dark";

const options: Array<{ value: Theme; label: LeoKey; icon: string }> = [
  { value: "system", label: "theme.system", icon: "◐" },
  { value: "light", label: "theme.light", icon: "☀" },
  { value: "dark", label: "theme.dark", icon: "☾" },
];

/**
 * An M3 segmented button.
 *
 * Three options rather than a switch because "match the system" is a genuinely
 * different choice from "always light" — a toggle would silently convert the
 * former into the latter the first time anyone touched it.
 */
export function ThemeToggle({
  value,
  onChange,
}: {
  value: Theme;
  onChange: (theme: Theme) => void;
}) {
  const { t } = useLeoTranslations();

  return (
    <div
      role="radiogroup"
      aria-label={t("menu.appearance")}
      className="inline-flex h-8 overflow-hidden rounded-full border border-outline-variant"
    >
      {options.map((option) => {
        const selected = value === option.value;
        const label = t(option.label);

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            // Icons are decorative; the accessible name comes from the label.
            aria-label={label}
            title={label}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-9 text-xs transition-colors",
              selected
                ? "bg-primary-container text-on-primary-container"
                : "text-on-surface-variant hover:bg-primary/8",
            )}
          >
            <span aria-hidden="true">{option.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
