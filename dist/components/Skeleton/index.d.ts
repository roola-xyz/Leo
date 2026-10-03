/**
 * A placeholder in the shape of the thing that is coming.
 *
 * Not decoration. A grid that appears all at once after a blank pause reads as
 * slower than the same grid whose layout was there from the first frame, and
 * — more usefully — the page does not jump when the data lands, because the
 * space was already the right size.
 *
 * Marked `aria-hidden`; the region that fills in carries `aria-busy`. A screen
 * reader should hear "loading" once, not twelve grey rectangles.
 */
export declare function Skeleton({ className }: {
    className?: string;
}): import("react").JSX.Element;
