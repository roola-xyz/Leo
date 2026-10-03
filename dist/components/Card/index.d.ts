import { ReactNode } from 'react';
/**
 * An M3 filled card: depth is signalled with surface tone rather than a shadow,
 * which is why there is no border and no elevation class here.
 */
export declare function Card({ className, children }: {
    className?: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function CardHeader({ title, description }: {
    title: string;
    description?: string;
}): import("react").JSX.Element;
export declare function CardBody({ className, children }: {
    className?: string;
    children: ReactNode;
}): import("react").JSX.Element;
