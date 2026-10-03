import { ReactNode } from 'react';
import { Theme } from '../ThemeToggle';
/** The little that the menu needs to know about whoever is signed in. */
export interface UserMenuUser {
    name: string;
    email: string;
    image?: string | null;
    /**
     * An identifier shown under the address, in a monospace face. Control uses
     * it for an agent's reference — "this is Sam, reference AG-1042" — because
     * that is the thing they read aloud to a customer and it should be somewhere
     * they can find it without leaving the call.
     */
    reference?: string | null;
}
/**
 * Every word the menu says, so an application that is translated can hand
 * over its own. Untranslated applications leave these alone.
 */
export interface UserMenuLabels {
    panel: string;
    appearance: string;
    signOut: string;
}
/**
 * The account menu in the app bar.
 *
 * Signed in, the bar shows who you are and nothing else; the details and the
 * sign-out sit behind a click. That keeps a permanent, irreversible action out
 * of one stray click's reach, and stops the bar competing with the page for
 * attention on a narrow screen.
 *
 * `children` is for the rows an application adds between appearance and
 * sign-out — accounts puts its language picker there. They are rendered inside
 * the panel, so clicking them does not dismiss it: the outside-click handler
 * only fires beyond this element, which is what lets a change be seen taking
 * effect.
 */
export declare function UserMenu({ user, theme, onThemeChange, onSignOut, labels: given, children, }: {
    user: UserMenuUser;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
    onSignOut: () => void;
    labels?: Partial<UserMenuLabels>;
    children?: ReactNode;
}): import("react").JSX.Element;
/**
 * A row of the panel, for whatever an application adds. Sits under the
 * appearance row and takes the same shape, so a language picker and the
 * appearance control read as two settings of one kind.
 */
export declare function UserMenuRow({ label, children }: {
    label: string;
    children: ReactNode;
}): import("react").JSX.Element;
