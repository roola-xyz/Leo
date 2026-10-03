/**
 * Join class names, dropping anything falsy.
 *
 * Deliberately not clsx or tailwind-merge: the components here never need to
 * resolve conflicting Tailwind utilities, so a dependency would buy nothing.
 */
export declare function cn(...classes: Array<string | false | null | undefined>): string;
