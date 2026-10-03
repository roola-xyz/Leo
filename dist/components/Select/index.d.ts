import { SelectHTMLAttributes } from 'react';
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    hint?: string;
    options: Array<{
        value: string;
        label: string;
    }>;
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
export declare function Select({ label, error, hint, options, placeholder, className, ...props }: SelectProps): import("react").JSX.Element;
export {};
