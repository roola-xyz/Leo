import { ReactNode } from 'react';
/**
 * A filter pill, as in the row above a feed.
 *
 * Rendered as a real radio group by the caller — these are one choice from a
 * set, not a row of independent toggles, and building them out of buttons is
 * how a keyboard user ends up tabbing through fifteen filters to reach the
 * grid.
 */
export declare function Chip({ selected, onClick, children, }: {
    selected?: boolean;
    onClick?: () => void;
    children: ReactNode;
}): import("react").JSX.Element;
