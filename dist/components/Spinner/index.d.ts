/**
 * A loading indicator with an accessible name.
 *
 * `role="status"` and the visually hidden label are what make this mean
 * something to a screen reader — a spinning SVG with no text announces nothing
 * at all, so the page simply appears to be empty.
 */
export declare function Spinner({ label, className }: {
    label?: string;
    className?: string;
}): import("react").JSX.Element;
