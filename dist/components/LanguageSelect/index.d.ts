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
export declare function LanguageSelect({ value, options, onChange, label, className, }: {
    value: string;
    options: readonly LanguageOption[];
    onChange: (value: string) => void;
    /** The accessible name. Translated by the caller, like everything else. */
    label: string;
    className?: string;
}): import("react").JSX.Element;
