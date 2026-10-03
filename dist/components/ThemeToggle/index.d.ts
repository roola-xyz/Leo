export type Theme = "system" | "light" | "dark";
/**
 * An M3 segmented button.
 *
 * Three options rather than a switch because "match the system" is a genuinely
 * different choice from "always light" — a toggle would silently convert the
 * former into the latter the first time anyone touched it.
 */
export declare function ThemeToggle({ value, onChange, }: {
    value: Theme;
    onChange: (theme: Theme) => void;
}): import("react").JSX.Element;
