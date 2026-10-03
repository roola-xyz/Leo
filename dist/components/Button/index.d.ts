import { ButtonHTMLAttributes, ReactNode } from 'react';
/**
 * Material 3 button variants, in descending order of emphasis. Having them named
 * by emphasis rather than by colour is what keeps one primary action per view.
 */
type Variant = "filled" | "tonal" | "outlined" | "text";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    loading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}
export declare function Button({ variant, loading, icon, className, disabled, children, ...props }: ButtonProps): import("react").JSX.Element;
export {};
