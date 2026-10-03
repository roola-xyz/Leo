import { ReactNode } from 'react';
import { IconName } from '../Icon';
/**
 * A dropdown anchored to whatever opened it.
 *
 * Hand-built rather than pulled in, because the whole of what a menu owes you is
 * short and the parts that are usually skipped are the parts that matter:
 *
 *   - Escape closes it, and returns focus to the trigger. Somebody who opened
 *     this from the keyboard has to be able to get back out to where they were.
 *   - A click anywhere else closes it, including on another menu's trigger.
 *   - `aria-expanded` and `aria-haspopup` on the trigger, so it is announced as
 *     a menu rather than as a button that mysteriously changes the page.
 *
 * It does not implement arrow-key roving focus. The items are ordinary buttons
 * and links in DOM order, so Tab already walks them in the order they are read;
 * adding a second, different keyboard model would be worse than not having one.
 */
export declare function Menu({ trigger, align, children, className, }: {
    /** Rendered inside the trigger button. */
    trigger: ReactNode;
    align?: "start" | "end";
    children: ReactNode | ((close: () => void) => ReactNode);
    className?: string;
}): import("react").JSX.Element;
/**
 * One row. A button by default, or a link when `href` is given — the difference
 * matters to anybody middle-clicking, and to a screen reader announcing what
 * will happen.
 */
export declare function MenuItem({ icon, href, onClick, selected, danger, children, }: {
    icon?: IconName;
    href?: string;
    onClick?: () => void;
    /** Renders a tick, and marks the row as the chosen one of a set. */
    selected?: boolean;
    danger?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function MenuSeparator(): import("react").JSX.Element;
export declare function MenuLabel({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
