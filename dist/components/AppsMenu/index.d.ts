/**
 * The apps launcher: every Roola application, one click away.
 *
 * The list comes from accounts — `GET /api/apps` at `accountsUrl` — rather than
 * being written into each frontend. Five hand-maintained copies would be five
 * lists, and four of them would be wrong within a month — and an app with no
 * address configured is dropped server-side, so this never renders a tile that
 * goes nowhere.
 *
 * Public, and shown signed out. Moving between Roola products is not something
 * somebody should have to hold an account to do.
 */
export declare function AppsMenu({ accountsUrl }: {
    accountsUrl: string;
}): import("react").JSX.Element;
