import { ReactNode } from 'react';
type Tone = "neutral" | "green" | "red" | "amber" | "blue";
export declare function Badge({ tone, children }: {
    tone?: Tone;
    children: ReactNode;
}): import("react").JSX.Element;
export {};
