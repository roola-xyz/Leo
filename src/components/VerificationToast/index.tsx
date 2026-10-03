import { useEffect, useState } from "react";
import { Button } from "../Button";
import { useLeoTranslations } from "../../i18n/messages";

/**
 * A pending identity check, as every product's `/api/verifications` returns it.
 * Declared here rather than imported from an application so the toast has one
 * shape wherever it is shown.
 */
export interface Verification {
  uid: string;
  agent_name: string;
  reason: string;
  /** The number the agent reads aloud. */
  challenge: string;
  expires_at: string;
  seconds_remaining: number;
}

interface Props {
  verification: Verification;
  /** May be async: the toast shows a spinner on the pressed button until it settles. */
  onApprove: (uid: string) => void | Promise<void>;
  onDeny: (uid: string) => void | Promise<void>;
  onLapse: (uid: string) => void;
}

/**
 * The prompt a customer sees while a support agent is on the phone with them.
 *
 * Two things make this safe to act on, and both are shown deliberately:
 *
 *  - the agent's name, so the request is attributable, and
 *  - a challenge number the agent reads aloud. If the number on screen does not
 *    match what the caller says, the caller did not raise this request and the
 *    customer should deny it. Without that, a prompt arriving during an
 *    unsolicited call would be indistinguishable from a genuine one.
 *
 * The countdown is not decoration either: it tells the user this decision
 * belongs to the call happening now, not to whenever they next look at the tab.
 */
export function VerificationToast({ verification, onApprove, onDeny, onLapse }: Props) {
  const { t, rich } = useLeoTranslations();
  const [remaining, setRemaining] = useState(verification.seconds_remaining);
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);

  useEffect(() => {
    // Recomputed from the expiry timestamp rather than by decrementing, so a
    // backgrounded tab (where timers are throttled) does not drift into showing
    // time that has already gone.
    const expiresAt = new Date(verification.expires_at).getTime();

    const tick = () => {
      const left = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
      setRemaining(left);

      if (left === 0) {
        onLapse(verification.uid);
      }
    };

    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [verification.uid, verification.expires_at, onLapse]);

  async function respond(action: "approve" | "deny") {
    setBusy(action);

    try {
      await (action === "approve" ? onApprove : onDeny)(verification.uid);
    } catch {
      // The hook has already put a message on screen. Swallowing it here only
      // stops an unhandled rejection; the toast deliberately stays so the user
      // can try again.
    } finally {
      setBusy(null);
    }
  }

  return (
    <div
      // assertive: this interrupts, on purpose. It is time limited and someone is
      // waiting on the phone.
      role="alertdialog"
      aria-live="assertive"
      aria-labelledby={`verification-${verification.uid}-title`}
      className="w-full max-w-sm overflow-hidden rounded-card bg-surface shadow-lg ring-1 ring-outline-variant"
    >
      <div className="flex items-start gap-3 border-b border-outline-variant px-4 py-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-warning-container text-on-warning-container">
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <div className="min-w-0">
          <h2
            id={`verification-${verification.uid}-title`}
            className="text-sm font-semibold text-on-surface"
          >
            {t("verification.title")}
          </h2>
          <p className="mt-0.5 text-sm text-on-surface-variant">
            {rich("verification.body", {
              agent: verification.agent_name,
              b: (chunks) => <span className="font-medium">{chunks}</span>,
            })}
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-3">
        <div>
          <p className="text-xs text-on-surface-variant">{t("verification.reason")}</p>
          <p className="text-sm text-on-surface">{verification.reason}</p>
        </div>

        <div className="rounded-field bg-surface-container px-3 py-2">
          <p className="text-xs text-on-surface-variant">{t("verification.challenge")}</p>
          <p className="font-mono text-lg font-semibold tracking-[0.2em] text-on-surface">
            {verification.challenge}
          </p>
          <p className="mt-1 text-xs text-on-surface-variant">{t("verification.mismatch")}</p>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={
              remaining <= 15
                ? "text-xs font-medium text-error"
                : "text-xs text-on-surface-variant"
            }
          >
            {t("verification.expires", { seconds: remaining })}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={() => respond("deny")}
              loading={busy === "deny"}
              disabled={busy !== null}
            >
              {t("verification.deny")}
            </Button>
            <Button
              onClick={() => respond("approve")}
              loading={busy === "approve"}
              disabled={busy !== null}
            >
              {t("verification.approve")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
