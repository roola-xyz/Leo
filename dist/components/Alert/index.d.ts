import { ReactNode } from 'react';
type Tone = "error" | "success" | "info" | "warning";
export declare function Alert({ tone, children }: {
    tone?: Tone;
    children: ReactNode;
}): import("react").JSX.Element;
export {};
