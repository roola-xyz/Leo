import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../../cn";
import { Icon } from "../Icon";
import { useLeoTranslations } from "../../i18n/messages";
import { PanelGroup, PanelSurface, PanelTopLine } from "../Panel";

interface RoolaApp {
  name: string;
  description: string;
  url: string;
  icon: string;
}

/** The little the launcher needs to know about whoever is signed in. */
/** Where a browser keeps which tiles it put in its favourites. */
const FAVOURITES_KEY = "roola.apps.favourites";

/** How many tiles are favourites on a browser that has never chosen. */
const DEFAULT_FAVOURITES = 6;

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
 *
 * Drawn as Google's launcher is drawn, and as the account menu beside it is:
 * the same sheet and top line (see `Panel`), then a card headed "Your
 * favourites" with the pencil that edits them, and every other app below the
 * card on the sheet itself. The person's own account is not a tile here: the
 * account menu beside this is where they are, and a launcher that led back
 * to it was one tile everybody saw and nobody used. Which apps are
 * favourites is this browser's choice, kept in local storage: it is a
 * convenience about a machine, not a fact about the person, and it costs
 * nothing to make again elsewhere. Until a choice is made, the first few
 * apps accounts lists are the favourites.
 *
 * While editing, the favourites can be put in any order — dragged, or moved
 * with the arrow keys from the keyboard — and the order is kept with the
 * choice. The apps below the card stay in accounts' order: they are the
 * ones nobody has arranged.
 */
export function AppsMenu({
  accountsUrl,
  panelClassName,
}: {
  accountsUrl: string;
  /** Extra classes for the panel — see the same prop on UserMenu. */
  panelClassName?: string;
}) {
  const { t } = useLeoTranslations();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [apps, setApps] = useState<RoolaApp[]>([]);
  const [chosen, setChosen] = useState<string[] | null>(rememberedFavourites);
  const [dragging, setDragging] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Fetched when first opened, not on page load: this is a navigation aid most
  // visits never touch, and it should not cost every page a request.
  useEffect(() => {
    if (!open || apps.length > 0) return;

    fetch(`${accountsUrl}/api/apps`, { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : { apps: [] }))
      .then((payload: { apps: RoolaApp[] }) => setApps(payload.apps ?? []))
      .catch(() => undefined);
  }, [open, apps.length]);

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }

    // Escape leaves editing first, then closes it and returns focus to the
    // button that opened it. Without the last part, dismissing the menu leaves
    // focus on nothing and the next Tab starts again from the top of the page.
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (editing) {
        setEditing(false);

        return;
      }

      setOpen(false);
      trigger.current?.focus();
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, editing]);

  const close = () => {
    setOpen(false);
    setEditing(false);
    trigger.current?.focus();
  };

  // The favourites are the chosen names in the chosen order; the rest is
  // everything else, in the order accounts lists it. A name this browser
  // chose that accounts no longer lists is simply not drawn.
  const { favourites, rest } = useMemo(() => {
    const names = chosen ?? apps.slice(0, DEFAULT_FAVOURITES).map((app) => app.name);

    return {
      favourites: names.map((name) => apps.find((app) => app.name === name)).filter((app) => app !== undefined),
      rest: apps.filter((app) => !names.includes(app.name)),
    };
  }, [apps, chosen]);

  const choose = (names: string[]) => {
    setChosen(names);
    rememberFavourites(names);
  };

  const toggle = (app: RoolaApp) => {
    const names = favourites.map((entry) => entry.name);

    choose(names.includes(app.name) ? names.filter((name) => name !== app.name) : [...names, app.name]);
  };

  /** Put `name` where `before` is, shifting the rest along. */
  const placeBefore = (name: string, before: string) => {
    if (name === before) return;

    const names = favourites.map((entry) => entry.name).filter((entry) => entry !== name);
    const at = names.indexOf(before);

    names.splice(at === -1 ? names.length : at, 0, name);
    choose(names);
  };

  /** One step left or right, from the keyboard. */
  const move = (name: string, by: -1 | 1) => {
    const names = favourites.map((entry) => entry.name);
    const from = names.indexOf(name);
    const to = from + by;

    if (from === -1 || to < 0 || to >= names.length) return;

    names.splice(from, 1);
    names.splice(to, 0, name);
    choose(names);
  };

  const loaded = apps.length > 0;

  return (
    <div ref={container} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((was) => !was)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("apps.label")}
        title={t("apps.label")}
        className={cn(
          "flex size-9 items-center justify-center rounded-full transition-colors",
          "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
          open && "bg-surface-container text-on-surface",
        )}
      >
        <GridIcon />
      </button>

      {open && (
        <PanelSurface label={t("apps.label")} className={panelClassName}>
          {/* No title: the launcher says what it is by being a page of
              tiles, and the first words on it are the favourites card's. */}
          <PanelTopLine onClose={close} closeLabel={t("menu.close")} />

          {/* The sheet scrolls, not the page: on a short screen the launcher
              is taller than the window and the top line stays where it is. */}
          <div className="max-h-[min(70vh,34rem)] overflow-y-auto">
            <PanelGroup label={t("apps.favourites")}>
              <div className="bg-surface p-2 dark:bg-surface-high" aria-busy={!loaded}>
                <div className="flex min-h-10 items-center justify-between gap-2 px-2">
                  <h3 className="text-base font-medium text-on-surface">{t("apps.favourites")}</h3>

                  {/* The pencil becomes a tick while editing: the same button,
                      so the way out is where the way in was. */}
                  {loaded && (
                    <button
                      type="button"
                      onClick={() => setEditing((was) => !was)}
                      aria-pressed={editing}
                      aria-label={editing ? t("apps.done") : t("apps.edit")}
                      title={editing ? t("apps.done") : t("apps.edit")}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full transition-colors",
                        "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                        editing && "bg-primary-container text-on-primary-container hover:bg-primary-container",
                      )}
                    >
                      <Icon name={editing ? "check" : "edit"} className="size-5" />
                    </button>
                  )}
                </div>

                {editing && <p className="px-2 pb-2 text-xs text-on-surface-variant">{t("apps.reorder")}</p>}

                {loaded ? (
                  <ul className="grid grid-cols-3 gap-1">
                    {favourites.map((app) => (
                      <li key={app.name}>
                        <Tile
                          href={app.url}
                          name={app.name}
                          description={app.description}
                          editing={editing ? "remove" : undefined}
                          editLabel={t("apps.remove", { app: app.name })}
                          onEdit={() => toggle(app)}
                          dragging={dragging === app.name}
                          onDragStart={() => setDragging(app.name)}
                          onDragEnd={() => setDragging(null)}
                          onDropHere={() => {
                            if (dragging) placeBefore(dragging, app.name);
                            setDragging(null);
                          }}
                          onMove={(by) => move(app.name, by)}
                        >
                          <AppIcon name={app.icon} />
                        </Tile>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <p className="sr-only">{t("apps.loading")}</p>
                    <ul aria-hidden="true" className="grid grid-cols-3 gap-1">
                      {Array.from({ length: DEFAULT_FAVOURITES }, (_, index) => (
                        <li key={index} className="flex flex-col items-center gap-2 px-2 py-3">
                          <span className="size-12 animate-pulse rounded-full bg-surface-container" />
                          <span className="h-3 w-14 animate-pulse rounded-full bg-surface-container" />
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </PanelGroup>

            {/* Everything else, on the sheet itself rather than in a card —
                the card is what says "these are yours"; these are merely
                there. Gone when everything is a favourite. */}
            {rest.length > 0 && (
              <ul className="mt-2 grid grid-cols-3 gap-1 px-2 pb-1">
                {rest.map((app) => (
                  <li key={app.name}>
                    <Tile
                      href={app.url}
                      name={app.name}
                      description={app.description}
                      editing={editing ? "add" : undefined}
                      editLabel={t("apps.add", { app: app.name })}
                      onEdit={() => toggle(app)}
                    >
                      <AppIcon name={app.icon} />
                    </Tile>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PanelSurface>
      )}
    </div>
  );
}

/**
 * One tile: the picture over the name, the description as its tooltip. A
 * link, ordinarily; while the favourites are being edited it is a button
 * that moves it between the card and the sheet, with a small badge on the
 * picture saying which way — a plus to add, a minus to remove — so that
 * nothing navigates away in the middle of arranging things.
 *
 * A favourite being edited can also be dragged onto another to take its
 * place, or nudged a step with the arrow keys — the browser's own drag and
 * drop, which is what a mouse expects, and the keyboard for everybody else.
 */
function Tile({
  href,
  name,
  description,
  editing,
  editLabel,
  onEdit,
  dragging = false,
  onDragStart,
  onDragEnd,
  onDropHere,
  onMove,
  children,
}: {
  href: string;
  name: string;
  description?: string;
  editing?: "add" | "remove";
  editLabel?: string;
  onEdit?: () => void;
  /** This tile is the one being dragged. */
  dragging?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  /** Something was dropped on this tile: it goes here, and this one moves on. */
  onDropHere?: () => void;
  /** An arrow key: one step left or right. */
  onMove?: (by: -1 | 1) => void;
  children: ReactNode;
}) {
  const [over, setOver] = useState(false);
  const arrangeable = editing === "remove" && onDropHere !== undefined;

  const className = cn(
    "flex w-full flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center",
    "transition-colors hover:bg-surface-container",
    "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
    arrangeable && "cursor-grab active:cursor-grabbing",
    dragging && "opacity-40",
    over && "bg-surface-container ring-2 ring-primary ring-inset",
  );

  const content = (
    <>
      <span className="relative">
        {children}
        {editing && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full ring-2 ring-surface dark:ring-surface-high",
              editing === "add" ? "bg-primary text-on-primary" : "bg-on-surface-variant text-surface",
            )}
          >
            <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M2.5 6h7" />
              {editing === "add" && <path d="M6 2.5v7" />}
            </svg>
          </span>
        )}
      </span>
      <span className="w-full truncate text-sm leading-4 font-medium text-on-surface">{name}</span>
    </>
  );

  if (editing) {
    return (
      <button
        type="button"
        onClick={onEdit}
        aria-label={editLabel}
        title={editLabel}
        className={className}
        draggable={arrangeable}
        onDragStart={(event) => {
          if (!arrangeable) return;

          // Firefox will not start a drag without some data on it.
          event.dataTransfer.setData("text/plain", name);
          event.dataTransfer.effectAllowed = "move";
          onDragStart?.();
        }}
        onDragEnd={() => {
          setOver(false);
          onDragEnd?.();
        }}
        onDragOver={(event) => {
          if (!arrangeable) return;

          // The default is to refuse the drop.
          event.preventDefault();
          event.dataTransfer.dropEffect = "move";
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          if (!arrangeable) return;

          event.preventDefault();
          setOver(false);
          onDropHere?.();
        }}
        onKeyDown={(event) => {
          if (!arrangeable || !onMove) return;

          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            onMove(event.key === "ArrowLeft" ? -1 : 1);
            // The tile keeps the keyboard where it went: React re-keys the
            // list by name, so the same button is still the focused one.
          }
        }}
      >
        {content}
      </button>
    );
  }

  return (
    <a href={href} title={description} className={className}>
      {content}
    </a>
  );
}

function rememberedFavourites(): string[] | null {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVOURITES_KEY) ?? "null");

    return Array.isArray(stored) && stored.every((name) => typeof name === "string") ? stored : null;
  } catch {
    // Storage can be unavailable; the default favourites are a fine answer.
    return null;
  }
}

function rememberFavourites(names: string[]): void {
  try {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(names));
  } catch {
    // As above.
  }
}

function GridIcon() {
  // Three by three, the shape everybody already reads as "other apps".
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      {[5, 12, 19].map((y) => [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />))}
    </svg>
  );
}

const paths: Record<string, string> = {
  account: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1",
  cloud: "M7 18a4 4 0 010-8 5.5 5.5 0 0110.5-1.5A3.75 3.75 0 0118 18z",
  console: "M4 17l6-6-6-6M12 19h8",
  socialise: "M8 12a3 3 0 100-6 3 3 0 000 6zM2 20v-1a5 5 0 015-5h2a5 5 0 015 5v1M17 11l2 2 4-4",
  docs: "M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7",
  support: "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1.2-1.5 2M12 17h.01",
  politicise: "M4 20h16M6 20V9M18 20V9M4 9h16l-2-4H6zM10 20v-5h4v5M9 12h6M9 15.5h6",
  // A megaphone: the mouth at the right, the handle below, two sound arcs.
  adverts: "M3 10v4a1 1 0 001 1h2.5l6 3.5V5.5L6.5 9H4a1 1 0 00-1 1zM6.5 15l1 4.5h2.5L9 15M16.5 9.5a3.5 3.5 0 010 5M19 7a7 7 0 010 10",
  // A play button in a screen: video, and the frame it plays in.
  helix: "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2zM10 9v6l5-3z",
  // A newspaper: the folded front page, a masthead line and two columns.
  news: "M4 5h13v14H6a2 2 0 01-2-2zM17 9h3v8a2 2 0 01-2 2M7 8h7M7 12h3v4H7zM12 12h2M12 15h2",
  // A feed: the two arcs and the dot everybody reads as "things arrive here".
  everything: "M4 4a16 16 0 0116 16M4 11a9 9 0 019 9M5.5 19.5h.01",
  // The estate's front door: a house, because the Roola tile is where you
  // start from and come back to, and everything else in the launcher is a
  // room off it.
  roola: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z",
  // An organisation chart: one box over two, joined. "Your people, and what
  // they may open" is a shape before it is a list.
  manage: "M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4",
};

/**
 * Each app's colour, so a page of tiles reads as a page of different things
 * rather than nine of the same purple. The theme's container roles, which
 * are already tuned to both themes, and light washes of its accents where
 * the containers run out; the names are the theme's and say nothing about
 * the app — Helix is not an error, it is red. Not the secondary container:
 * in the dark theme it is the card's own colour, and the circle vanishes.
 */
const tones: Record<string, string> = {
  roola: "bg-primary-container text-on-primary-container",
  politicise: "bg-success-container text-on-success-container",
  helix: "bg-error-container text-on-error-container",
  news: "bg-warning-container text-on-warning-container",
  cloud: "bg-primary/15 text-primary",
  socialise: "bg-success/15 text-success",
  adverts: "bg-warning-container text-on-warning-container",
  manage: "bg-error/15 text-error",
  support: "bg-primary-container text-on-primary-container",
};

/**
 * A product's mark as the launcher draws it. Exported so a page that lists
 * products — the account dashboard — shows the same disc for the same product.
 */
export function AppIcon({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-full",
        tones[name] ?? "bg-primary-container text-on-primary-container",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-6"
      >
        <path d={paths[name] ?? paths.helix!} />
      </svg>
    </span>
  );
}
