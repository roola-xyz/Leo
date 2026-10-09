import { useEffect, useLayoutEffect, useState, type FormEvent, type ReactNode } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Field } from "../Field";
import { useLeoTranslations } from "../../i18n/messages";

/**
 * What a platform's door says while it is closed.
 *
 * Every product in the estate can be closed to a waiting list from control,
 * and while it is, this is the whole of the product: a name, a sentence, and
 * a form that takes an email address. One component rather than one per
 * product, so the door reads the same everywhere and a change to the wording
 * is a change in one place.
 *
 * It is also the first thing anybody sees of a product that is not open yet,
 * so it is dressed for the occasion: the name set large in its own column,
 * the form in a card with a hairline of primary travelling round it, and the
 * page lit from behind by two slow drifts of the product's own colour. All
 * of it is drawn from the theme's roles, so a product that has set its own
 * primary gets a door in its own colour without saying anything here, and
 * every motion is gated on `motion-safe` so somebody who has asked for less
 * movement gets a still page with the same words on it.
 */
export interface PlatformStatus {
  name: string;
  open: boolean;
  waiting_list: boolean;
  since: string | null;
  message: string | null;
  /**
   * Accounts' registration page for this platform. Present, joining the list
   * is making a Roola account with the platform already on it, so the person
   * who queued signs straight in the day it opens; absent (an older accounts,
   * or the gate switched off), the form hands an address to `onJoin` as before.
   */
  join_url?: string | null;
}

/**
 * Sends somebody to accounts to join: the registration page for the platform,
 * with the door they came through and the address they typed carried along.
 *
 * Never resolves, because the page is leaving — a form that flashed "you are
 * on the list" on its way out would be claiming something that has not
 * happened yet. Called from a landing page in a frame it still moves this
 * window, not the frame: the function belongs to the product's page.
 */
export function joinThroughAccounts(joinUrl: string, input: { email?: string; source?: string }): Promise<void> {
  const target = new URL(joinUrl);

  if (input.source) target.searchParams.set("source", input.source);
  if (input.email) target.searchParams.set("email", input.email);

  window.location.assign(target.toString());

  return new Promise(() => {});
}

/**
 * Says the page has something on it.
 *
 * Each product's index.html shows a splash — the mark and the name — until
 * the application has drawn, and hides it on `html[data-app-ready]`. Set
 * here rather than on the first render into #root, because the first render
 * can be a frame whose document has not loaded yet: hiding the splash then
 * left a white page until the landing page arrived.
 */
function ready(): void {
  document.documentElement.dataset.appReady = "1";
}

/**
 * The product itself: ready once it has drawn something.
 *
 * Not on mount. A product fetched only once the door is open (a lazy import
 * behind a Suspense whose fallback is nothing) shows nothing until its chunk
 * arrives, and a page called ready then would drop the splash onto a blank
 * one. So the mark waits for the element the product renders into, #root,
 * to have a child; a page with no such element is ready at once.
 */
function Open({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.getElementById("root");

    if (!root || root.firstElementChild) {
      ready();
      return;
    }

    const drawn = new MutationObserver(() => {
      if (!root.firstElementChild) return;

      ready();
      drawn.disconnect();
    });

    drawn.observe(root, { childList: true });

    return () => drawn.disconnect();
  }, []);

  return <>{children}</>;
}

export function WaitingList({
  status,
  onJoin,
  source,
  logo,
  tagline,
}: {
  status: PlatformStatus;
  /** Hands the sign-up to the product's own API. Resolves on success; throws with a message otherwise. */
  onJoin: (input: { email: string; name: string; source?: string }) => Promise<void>;
  /** Which door this is, for a product with more than one: "watch", "studio". */
  source?: string;
  logo?: ReactNode;
  /**
   * The product's own line — what it is, in a sentence — set under the name.
   * Control's message, when it has written one, goes by the form instead:
   * that is about the list, this is about the product.
   */
  tagline?: string;
}) {
  const { t, rich } = useLeoTranslations();
  const [email, setEmail] = useState("");

  useEffect(ready, []);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Joining is registering, and the registration page asks the name itself.
  const registers = Boolean(status.join_url);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      await onJoin({ email: email.trim(), name: name.trim(), source });
      setJoined(true);
    } catch (thrown) {
      setError(thrown instanceof Error && thrown.message ? thrown.message : t("waiting.failed"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-surface-low px-4 py-16 sm:px-8">
      <Backdrop />

      <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,26rem)] lg:gap-20">
        {/* The name, set as large as the column allows. */}
        <section className="motion-safe:animate-arrive">
          {logo && <div className="mb-8 text-primary">{logo}</div>}

          <p className="text-xs font-medium tracking-[0.2em] text-on-surface-variant uppercase">Roola</p>
          <h1 className="mt-3 text-5xl leading-none font-normal tracking-tight text-balance text-on-surface sm:text-6xl">
            {status.name}
          </h1>

          {tagline && (
            <p className="mt-5 max-w-md text-lg leading-7 text-pretty text-on-surface-variant sm:text-xl sm:leading-8">
              {tagline}
            </p>
          )}

          <p className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-surface-container py-1.5 pr-4 pl-3 text-sm text-on-surface-variant">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {t("waiting.open")}
          </p>
        </section>

        {/* The card, with a hairline of primary going round it. */}
        <section className="relative motion-safe:animate-arrive motion-safe:[animation-delay:120ms]">
          <div
            aria-hidden="true"
            className="absolute -inset-[1.5px] overflow-hidden rounded-[calc(1.75rem+1.5px)] bg-outline-variant/40"
          >
            {/*
             * A conic sweep on a square three times the card, turned slowly:
             * only the outer pixel shows past the card, so what reads is a
             * light travelling round the edge. A transform alone, so it costs
             * the compositor and nothing else.
             */}
            <div
              className="absolute inset-[-100%] motion-safe:animate-[spin_14s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 200deg, var(--md-primary) 290deg, transparent 360deg)",
              }}
            />
          </div>

          <div className="relative rounded-card bg-surface p-6 shadow-[0_32px_80px_-32px_rgb(0_0_0/0.35)] sm:p-8">
            {joined ? (
              <div role="status" className="flex flex-col items-center py-4 text-center motion-safe:animate-arrive">
                <span className="flex size-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
                  <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true" fill="none">
                    <path
                      d="M5 12.5 10 17.5 19 7"
                      pathLength={1}
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="motion-safe:animate-draw"
                    />
                  </svg>
                </span>
                <h2 className="mt-5 text-xl font-medium tracking-tight text-on-surface">{t("waiting.joined")}</h2>
                <p className="mt-2 max-w-xs text-sm leading-5 text-pretty text-on-surface-variant">
                  {rich("waiting.joinedBody", {
                    strong: (chunks) => <span className="font-medium text-on-surface">{chunks}</span>,
                    email: email.trim(),
                    name: status.name,
                  })}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-medium tracking-tight text-on-surface">
                    {t("waiting.closed", { name: status.name })}
                  </h2>
                  <p className="text-sm leading-5 text-pretty text-on-surface-variant">
                    {status.message ?? t("waiting.tagline")}
                  </p>
                </div>

                {error && <Alert tone="error">{error}</Alert>}

                <div className="space-y-4">
                  <Field
                    label={t("waiting.email")}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {!registers && (
                    <Field
                      label={t("waiting.name")}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full shadow-[0_12px_32px_-12px_var(--md-primary)]"
                  loading={busy}
                  disabled={!email.includes("@")}
                >
                  {t("waiting.join")}
                </Button>

                <p className="text-center text-xs leading-4 text-pretty text-on-surface-variant">
                  {registers ? t("waiting.promiseAccount", { name: status.name }) : t("waiting.promise")}
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * What the page is lit by.
 *
 * A fine grid, faded out towards the edges so it reads as a surface rather
 * than as graph paper, and two soft discs of the product's own colour that
 * drift on their own clocks. Everything here is a role from the theme — the
 * grid is the outline colour, the discs are primary's container, at two strengths — so
 * it is right in both schemes and in every product's colour without a value
 * of its own.
 *
 * The discs are radial gradients rather than blurred elements. A blur filter
 * on something this large is rasterised in a bounded region and comes out
 * with straight edges where the region ends, which no amount of tuning
 * fixes; a gradient has no edge to find. The drift is a transform, so once
 * painted they only ever move.
 */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_65%_at_50%_45%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--md-outline-variant) 1px, transparent 1px), linear-gradient(90deg, var(--md-outline-variant) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />
      <div
        className="absolute -top-64 left-1/2 size-[56rem] -translate-x-[70%] motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, color-mix(in srgb, var(--md-primary-container) 80%, var(--md-primary)) 85%, transparent), transparent)",
        }}
      />
      <div
        className="absolute -right-64 -bottom-72 size-[52rem] motion-safe:animate-drift-slow"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--md-primary-container) 55%, transparent), transparent)",
        }}
      />
    </div>
  );
}

/**
 * What a landing page finds on the window that drew it.
 *
 * The brand kit's landing pages (`company/brand/<brand>/site`) are plain HTML
 * with a waiting-list form of their own. Shown in place of a closed product,
 * they look for this on their parent and hand the address to it, so the
 * sign-up goes through the product's own API — its list, its throttle, its
 * answers in the visitor's language — rather than anywhere the page knows.
 */
declare global {
  interface Window {
    roolaWaitingList?: {
      join: (email: string) => Promise<void>;
      message: string | null;
    };
  }
}

/**
 * The product's landing page, as the whole of a closed door.
 *
 * Drawn full-screen in a frame from the product's own origin, so the page is
 * the brand kit's page exactly, styles and all, and nothing of it leaks into
 * the product's stylesheet or the other way. The frame is checked once it has
 * loaded: a page that is not a landing page — the bundle was never copied in,
 * and the dev server answered with the product's own index — gives way to
 * the plain waiting list, so a missing file can never leave the door blank.
 */
function LandingPage({
  src,
  status,
  onJoin,
  source,
  fallback,
}: {
  src: string;
  status: PlatformStatus;
  onJoin: (input: { email: string; name: string; source?: string }) => Promise<void>;
  source?: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  // Laid down before the frame's own script can run and look for it.
  useLayoutEffect(() => {
    window.roolaWaitingList = {
      join: (email) => onJoin({ email, name: "", source }),
      message: status.message,
    };

    return () => {
      delete window.roolaWaitingList;
    };
  }, [onJoin, source, status.message]);

  if (failed) return <>{fallback}</>;

  return (
    <iframe
      src={src}
      title={status.name}
      className="fixed inset-0 size-full border-0 bg-surface-low"
      onLoad={(event) => {
        let page: Document | null = null;

        try {
          page = event.currentTarget.contentDocument;
        } catch {
          // Another origin: not a page this door can vouch for.
        }

        if (!page?.documentElement.dataset.landing) {
          setFailed(true);
          return;
        }

        // The tab says what the page says, not the product's usual title.
        document.title = page.title;
        ready();
      }}
    />
  );
}

/**
 * Shows the product only while its door is open.
 *
 * Asked once, on boot, through the product's own `/api/platform`. While the
 * answer is on its way nothing is drawn: a product that flashes its home page
 * for half a second before the waiting list replaces it has told everybody
 * what is behind the door.
 *
 * The check is a courtesy, not a control. The product's API refuses every
 * customer request while it is closed, so a gate that was bypassed would show
 * a shell whose every panel fails — see EnsurePlatformOpen in each backend.
 */
export function PlatformGate({
  fetchStatus,
  onJoin,
  source,
  logo,
  tagline,
  landing,
  children,
}: {
  fetchStatus: () => Promise<PlatformStatus>;
  onJoin: (input: { email: string; name: string; source?: string }) => Promise<void>;
  source?: string;
  logo?: ReactNode;
  tagline?: string;
  /**
   * The brand's landing page, served by the product itself — `/welcome/` —
   * shown in place of the plain waiting list while the door is closed. Left
   * out, the door is the plain waiting list.
   */
  landing?: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<PlatformStatus | null | "unknown">(null);

  useEffect(() => {
    let cancelled = false;

    fetchStatus()
      .then((s) => {
        if (!cancelled) setStatus(s);
      })
      // The product's API could not say. Its own middleware still enforces
      // the door, so failing open here costs nothing and blocking would cost
      // the whole product for an outage that is not its own.
      .catch(() => {
        if (!cancelled) setStatus("unknown");
      });

    return () => {
      cancelled = true;
    };
    // Once: the door does not change under a visitor mid-visit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === null) return null;

  if (status !== "unknown" && status.waiting_list) {
    /*
     * Joining goes to accounts when accounts says where: the list is a Roola
     * account with this platform on it. The product's own `onJoin` is only
     * the fallback, for an accounts that has not said.
     */
    const joinUrl = status.join_url;
    const join = joinUrl
      ? (input: { email: string; source?: string }) => joinThroughAccounts(joinUrl, input)
      : onJoin;

    const list = <WaitingList status={status} onJoin={join} source={source} logo={logo} tagline={tagline} />;

    if (landing) {
      return <LandingPage src={landing} status={status} onJoin={join} source={source} fallback={list} />;
    }

    return list;
  }

  return <Open>{children}</Open>;
}
