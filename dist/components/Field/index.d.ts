import { InputHTMLAttributes } from 'react';
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
export declare function Field({ label, error, hint, className, ...props }: FieldProps): import("react").JSX.Element;
export {};
