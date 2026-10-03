import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "../Icon";
import type { Theme } from "../ThemeToggle";
import { cn } from "../../cn";
import { LANGUAGES, type LocaleTag } from "../../languages";
import { useLeoTranslations } from "../../i18n/messages";
import { PanelGroup as Group, PanelSurface, PanelTopLine } from "../Panel";

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
  /**
   * A line under the address, for whatever a product knows about this person
   * that the estate does not: a handle, the seat they hold, their MP.
   */
  caption?: ReactNode;
}

/**
 * Who this account answers to, for the line across the top of the panel:
 * "Managed by Common Cause Group", with the way to that organisation's own
 * console beneath it when there is one. Roola is organisation-gated, so most
 * people have one; it is the first thing the panel says because it is the
 * first thing an administrator asks when something is not as expected.
 */
export interface UserMenuOrganisation {
  name: string;
  /**
   * The organisation's own mark — its logo, as Manage holds it — drawn beside
   * the line that names it. The picture in the corner stays the person's: the
   * trigger says who is signed in, and this says on whose behalf.
   */
  image?: string | null;
  /** Where the organisation is managed — Manage's address — and what to call the link. */
  url?: string;
  linkLabel?: string;
}

/**
 * Every word the menu says. They come from Leo's own catalogue in the language
 * of the page; an application with a reason to say one differently hands over
 * its own.
 */
export interface UserMenuLabels {
  panel: string;
  appearance: string;
  language: string;
  manageAccount: string;
  signOut: string;
  back: string;
  close: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  privacy: string;
  terms: string;
}

/** A link along the foot of the panel: the privacy policy, the terms. */
export interface UserMenuLink {
  label: string;
  href: string;
}

type View = "home" | "language" | "appearance";

/**
 * The account menu in the app bar, the same on every Roola site.
 *
 * The bar carries the avatar and nothing else; who you are, appearance and the
 * way out sit behind a click. That keeps a permanent, irreversible action out
 * of one stray click's reach, stops the bar competing with the page for
 * attention on a narrow screen — and, because these headers sit a click apart,
 * means the account is in the same place behind the same door on all of them.
 *
 * The panel is drawn the way Google's account panel is, because that is the
 * one every person who arrives here already knows how to read: who manages
 * the account across the top, the person in a card with their picture large,
 * the way to their account as its own row, then the settings and the
 * product's rows as groups of rounded cards, and the way out last. The same
 * items in the same order everywhere, so that somebody moving between Roola
 * sites finds each thing where they left it. The sheet, its top line and its
 * cards are `Panel`'s, shared with the apps launcher beside it.
 *
 * A setting is a row that names its current value — "Language · English" —
 * and opens, inside the panel, a list to choose from with a way back at the
 * top. Nothing pops out over the panel and nothing dismisses it: the choice
 * is made against the menu it was made in, and the row shows the new value
 * on the way back. Language is here even on sites that are not translated.
 * It is a preference about the person, saved to the account, and the sites
 * that are translated read it from there — so it has to be reachable from
 * wherever they are, not only from the one site that happens to act on it.
 */
export function UserMenu({
  user,
  organisation,
  theme,
  onThemeChange,
  locale,
  onLocaleChange,
  onSignOut,
  accountUrl,
  items,
  policiesUrl,
  links,
  labels: given,
  panelClassName,
  children,
}: {
  user: UserMenuUser;
  organisation?: UserMenuOrganisation | null;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  /**
   * The language row. Both or neither: a site that cannot save the preference
   * — control, whose staff are not accounts users — leaves both out and the
   * row is not drawn, rather than drawn and inert.
   */
  locale?: LocaleTag;
  onLocaleChange?: (locale: LocaleTag) => void;
  onSignOut: () => void;
  /**
   * Where "Manage your Roola account" goes — accounts' address. Left out on
   * accounts itself, which is that page, and on control, whose agents are not
   * accounts users.
   */
  accountUrl?: string;
  /**
   * The product's own rows, as `UserMenuItem`s, given the panel's `close` so a
   * row that navigates within the application can dismiss it first.
   */
  items?: (close: () => void) => ReactNode;
  /**
   * Where the estate's policies are read — policies' address. Given, the foot
   * of the panel carries the privacy policy and the terms of service, the two
   * every site is bound by, in the language of the page.
   */
  policiesUrl?: string;
  /** Any other line along the foot, after those two. */
  links?: UserMenuLink[];
  labels?: Partial<UserMenuLabels>;
  /**
   * Extra classes for the panel. For the header that floats over a hero and
   * redefines the colour roles for itself: the panel opened from it is a solid
   * surface again and has to say so.
   */
  panelClassName?: string;
  /** Extra settings rows, as `UserMenuRow`s, under appearance and language. */
  children?: ReactNode;
}) {
  const { t } = useLeoTranslations();

  const labels: UserMenuLabels = {
    panel: t("menu.account"),
    appearance: t("menu.appearance"),
    language: t("menu.language"),
    manageAccount: t("menu.manageAccount"),
    signOut: t("menu.signOut"),
    back: t("menu.back"),
    close: t("menu.close"),
    themeSystem: t("theme.system"),
    themeLight: t("theme.light"),
    themeDark: t("theme.dark"),
    privacy: t("menu.privacy"),
    terms: t("menu.terms"),
    ...given,
  };

  const foot: UserMenuLink[] = [
    ...(policiesUrl
      ? [
          {
            label: labels.privacy,
            href: `${policiesUrl.replace(/\/$/, "")}/privacy-policy`,
          },
          {
            label: labels.terms,
            href: `${policiesUrl.replace(/\/$/, "")}/terms-of-service`,
          },
        ]
      : []),
    ...(links ?? []),
  ];

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  // Close on a click anywhere else, and on Escape. `mousedown` rather than
  // `click`, so pressing outside dismisses the menu before whatever was under
  // the pointer reacts to it. Escape inside a view is the way back first,
  // and closes the panel only from the front.
  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (view !== "home") {
        setView("home");

        return;
      }

      setOpen(false);
      // Focus goes back to the trigger, so keyboard users are not dropped at
      // the top of the document with no idea where they were.
      trigger.current?.focus();
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, view]);

  // A view opens with its way back under the keyboard, and going back lands
  // on the row that was opened, so somebody tabbing through is never lost.
  useEffect(() => {
    if (!open) return;

    if (view === "home") opener.current?.focus();
    else back.current?.focus();
  }, [open, view]);

  const close = () => {
    setOpen(false);
    setView("home");
  };

  const enter = (next: View) => (event: ReactMouseEvent<HTMLButtonElement>) => {
    opener.current = event.currentTarget;
    setView(next);
  };

  const themes: Array<{ value: Theme; label: string; icon: IconName }> = [
    { value: "system", label: labels.themeSystem, icon: "desktop" },
    { value: "light", label: labels.themeLight, icon: "sun" },
    { value: "dark", label: labels.themeDark, icon: "moon" },
  ];

  const currentTheme =
    themes.find((option) => option.value === theme) ?? themes[0]!;
  const currentLanguage = LANGUAGES.find((language) => language.tag === locale);

  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${labels.panel}: ${user.name}`}
        className="flex rounded-full transition-[filter] hover:brightness-105"
      >
        <Initials name={user.name} image={user.image} />
      </button>

      {open && (
        <PanelSurface label={labels.panel} className={panelClassName}>
          {view === "home" ? (
            <>
              {/* The top line: whose account this is, and the way out. Only
                  drawn when there is an organisation to name; otherwise it
                  would be an empty strip above the person, and the way out
                  sits in the corner of their card instead. */}
              {organisation && (
                <PanelTopLine onClose={close} closeLabel={labels.close}>
                  <div className="flex items-center justify-center gap-3">
                    {organisation.image && (
                      <img
                        src={organisation.image}
                        alt=""
                        className="size-8 shrink-0 rounded-full object-cover"
                      />
                    )}
                    <div
                      className={
                        organisation.image ? "text-left" : "text-center"
                      }
                    >
                      <p className="text-sm text-on-surface">
                        {t("menu.managedBy", {
                          organisation: organisation.name,
                        })}
                      </p>
                      {organisation.url && (
                        <a
                          href={organisation.url}
                          className="text-sm text-primary hover:underline"
                        >
                          {organisation.linkLabel ?? organisation.name}
                        </a>
                      )}
                    </div>
                  </div>
                </PanelTopLine>
              )}

              {/* The person, in a card of their own: the picture large, the
                  whole name — this is the one place the account is identified
                  rather than greeted — and the address in full underneath. */}
              <Group className="relative">
                {!organisation && (
                  <button
                    type="button"
                    onClick={close}
                    aria-label={labels.close}
                    title={labels.close}
                    className="absolute top-1 right-1 flex size-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                  >
                    <Icon name="close" className="size-5" />
                  </button>
                )}
                <div
                  className={cn(
                    "flex items-center gap-4 px-4 py-4",
                    !organisation && "pr-12",
                  )}
                >
                  <Initials name={user.name} image={user.image} size="xl" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg leading-6 font-medium text-on-surface">
                      {user.name}
                    </p>
                    {/* Not truncated with an ellipsis alone: an address is worth
                        being able to read in full, so it wraps instead. */}
                    <p className="text-sm break-all text-on-surface-variant">
                      {user.email}
                    </p>
                    {user.reference && (
                      <p className="font-mono text-xs text-on-surface-variant">
                        {user.reference}
                      </p>
                    )}
                    {user.caption && (
                      <p className="mt-1 truncate text-sm text-on-surface-variant">
                        {user.caption}
                      </p>
                    )}
                  </div>
                </div>
              </Group>

              {/* Its own row rather than a chip under the picture: it is the
                  one thing about the person that is an action, and a full-width
                  row is what the thumb finds. An anchor, because it navigates to
                  another origin and middle-click and "open in new tab" have to
                  work. */}
              {accountUrl && (
                <Group>
                  <UserMenuItem icon="person" href={accountUrl} emphasis>
                    {labels.manageAccount}
                  </UserMenuItem>
                </Group>
              )}

              {/* The settings every Roola site carries, in the same order. Each
                  names its value and opens its list in place. */}
              <Group>
                <UserMenuItem
                  icon="palette"
                  onClick={enter("appearance")}
                  value={currentTheme.label}
                  opens
                >
                  {labels.appearance}
                </UserMenuItem>

                {locale && onLocaleChange && (
                  <UserMenuItem
                    icon="language"
                    onClick={enter("language")}
                    value={currentLanguage?.endonym ?? locale}
                    opens
                  >
                    {labels.language}
                  </UserMenuItem>
                )}

                {children}
              </Group>

              {items && <Group>{items(close)}</Group>}

              <Group>
                <UserMenuItem
                  icon="signOut"
                  onClick={() => {
                    close();
                    onSignOut();
                  }}
                >
                  {labels.signOut}
                </UserMenuItem>
              </Group>

              {foot.length > 0 && (
                <p className="flex flex-wrap items-center justify-center gap-x-2 px-4 pt-3 pb-1 text-xs text-on-surface-variant">
                  {foot.map((link, index) => (
                    <span key={link.href} className="flex items-center gap-x-2">
                      {index > 0 && <span aria-hidden="true">·</span>}
                      <a href={link.href} className="hover:underline">
                        {link.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
            </>
          ) : (
            <>
              {/* A view over the panel: the way back on the left of its title,
                  as a phone draws a settings page, then the choices as one card
                  with the current one ticked. */}
              <div className="flex min-h-10 items-center gap-1 px-1 py-1">
                <button
                  ref={back}
                  type="button"
                  onClick={() => setView("home")}
                  aria-label={labels.back}
                  title={labels.back}
                  className="flex size-10 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                >
                  <Icon name="arrowBack" className="size-5" />
                </button>
                <h2 className="text-base font-medium text-on-surface">
                  {view === "language" ? labels.language : labels.appearance}
                </h2>
              </div>

              <Group
                role="radiogroup"
                label={
                  view === "language" ? labels.language : labels.appearance
                }
              >
                {view === "language"
                  ? LANGUAGES.map((language) => (
                      <UserMenuItem
                        key={language.tag}
                        selected={language.tag === locale}
                        onClick={() => {
                          onLocaleChange?.(language.tag);
                          setView("home");
                        }}
                      >
                        <span lang={language.tag}>{language.endonym}</span>
                      </UserMenuItem>
                    ))
                  : themes.map((option) => (
                      <UserMenuItem
                        key={option.value}
                        icon={option.icon}
                        selected={option.value === theme}
                        onClick={() => {
                          onThemeChange(option.value);
                          setView("home");
                        }}
                      >
                        {option.label}
                      </UserMenuItem>
                    ))}
              </Group>
            </>
          )}
        </PanelSurface>
      )}
    </div>
  );
}

/**
 * A row of the panel: an icon, a label, and on the right either the setting's
 * current value, a tick for the chosen option of a list, or nothing.
 *
 * As a real link when it leaves for another origin and a button when it does
 * something here. `href` is an anchor rather than a router link on purpose —
 * leo does not know which router an application uses, and most of these rows
 * leave the application anyway. A row that navigates within it takes
 * `onClick`, closes the panel and navigates itself.
 */
export function UserMenuItem({
  icon,
  href,
  onClick,
  value,
  selected,
  opens = false,
  emphasis = false,
  children,
}: {
  icon?: IconName;
  href?: string;
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  /** The setting's current value, on the right: "English", "Dark". */
  value?: ReactNode;
  /**
   * Renders a tick, and marks the row as the chosen one of a set. Passing
   * `false` is meaningful — "one of a set, and not this one" — which is why
   * the check is against `undefined` rather than for truthiness.
   */
  selected?: boolean;
  /** The row opens a view inside the panel rather than doing something at once. */
  opens?: boolean;
  /** Drawn a shade heavier: the one row that is about the account itself. */
  emphasis?: boolean;
  children: ReactNode;
}) {
  const className = cn(
    "flex w-full min-h-12 items-center gap-4 px-4 py-3 text-left text-sm",
    "bg-surface text-on-surface transition-colors hover:bg-surface-container dark:bg-surface-high dark:hover:bg-surface-container",
    emphasis && "font-medium",
  );

  const content = (
    <>
      {icon && (
        <Icon name={icon} className="size-5 shrink-0 text-on-surface-variant" />
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {value !== undefined && (
        <span className="max-w-[45%] shrink-0 truncate text-sm text-on-surface-variant">
          {value}
        </span>
      )}
      {selected !== undefined && (
        // A fixed-width slot whether or not it is ticked, so the labels of a
        // set of options line up instead of shifting by the width of a tick.
        <span className="w-5 shrink-0">
          {selected && <Icon name="check" className="size-5 text-primary" />}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      role={selected !== undefined ? "radio" : undefined}
      aria-checked={selected}
      aria-haspopup={opens ? "true" : undefined}
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
}

/**
 * A settings row an application adds under appearance and language: a label
 * on the left, its control on the right, in the same card so it reads as a
 * setting of the same kind.
 */
export function UserMenuRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 bg-surface px-4 py-2 dark:bg-surface-high">
      <span className="text-sm text-on-surface">{label}</span>
      {children}
    </div>
  );
}

/**
 * Their picture, or their initial.
 *
 * One letter rather than two: the trigger is the size of the other controls
 * in the bar and a second letter crowds it. The stored image is already
 * square and 512px, so it needs no cropping here.
 *
 * Not the estate's `Avatar`: that one is a single coloured initial for a wall
 * of strangers, and this is a tonal mark for the one person who is signed in.
 */
function Initials({
  name,
  image,
  size = "sm",
}: {
  name: string;
  image?: string | null;
  size?: "sm" | "lg" | "xl";
}) {
  const dimensions =
    size === "xl"
      ? "size-16 text-2xl"
      : size === "lg"
        ? "size-10 text-sm"
        : "size-9 text-sm";

  if (image) {
    return (
      <img
        src={image}
        alt=""
        className={cn("shrink-0 rounded-full object-cover", dimensions)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        "bg-primary-container font-medium text-on-primary-container",
        dimensions,
      )}
    >
      {initial(name)}
    </span>
  );
}

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}
