import { ButtonHTMLAttributes } from 'react';
import { IconName } from '../Icon';
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconName;
    /**
     * Required, not optional. A button whose only content is a picture has no
     * accessible name at all without one, and "optional label" is how that ends up
     * shipping.
     */
    label: string;
    size?: "sm" | "md";
    active?: boolean;
}
export declare function IconButton({ icon, label, size, active, className, ...props }: IconButtonProps): import("react").JSX.Element;
export {};
