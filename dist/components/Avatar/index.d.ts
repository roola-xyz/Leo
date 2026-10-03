declare const sizes: {
    readonly xs: "size-6 text-[0.625rem]";
    readonly sm: "size-9 text-sm";
    readonly md: "size-10 text-base";
    readonly lg: "size-20 text-2xl";
    readonly xl: "size-32 text-5xl";
};
export declare function Avatar({ name, handle, src, size, className, }: {
    name: string;
    /**
     * Seeds the colour instead of the name where there is one. A handle is
     * unique and a name is not, so two people called Sam do not share a tint —
     * and somebody who changes their display name keeps theirs.
     */
    handle?: string | null;
    /** Their picture, if they have one. */
    src?: string | null;
    size?: keyof typeof sizes;
    className?: string;
}): import("react").JSX.Element;
export {};
