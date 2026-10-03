import { useEffect, useRef, useState, type ReactNode } from "react";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { cn } from "../../cn";
import { useLeoTranslations } from "../../i18n/messages";

/** One reason somebody can give, as the product's `/api/reports/reasons` lists them. */
export interface ReportReason {
  value: string;
  label: string;
}

/**
 * Telling us something is wrong with a thing — a video, a post, a letter.
 *
 * On every product this is the only thing that puts content in front of an
 * employee, because none of them review anything before it is published, which
 * makes a small dialog carry more weight than its size suggests.
 *
 * Two decisions are shared by every product and so live here.
 *
 * A reason has to be chosen, from a list, and the list is fetched rather than
 * written into the dialog. What a reviewer is shown is "thirty-eight of the
 * forty people who flagged this said the same thing", and free text cannot
 * produce that sentence. Fetching it means the wording has one spelling across
 * the platform and adding a reason is a backend change alone.
 *
 * And the answer is the same whatever happens: whether this was the first
 * report or the four hundredth, whether the thing is already in the queue,
 * whether we looked at it last week and left it up. None of that is a
 * reporter's to know, and all of it is a reason to keep pressing the button —
 * either because it looks like nothing is happening, or because it looks like
 * it is working. `onSubmit` resolves to the one sentence they are shown.
 *
 * What differs — the wording, the API call, what is said about privacy — the
 * product supplies. See each product's own `ReportDialog` for its glue.
 */
export function ReportDialog({
  heading,
  doneHeading,
  subject,
  prompt,
  reasons,
  reasonsError,
  noteLabel,
  notePlaceholder,
  submitLabel,
  onSubmit,
  onClose,
  children,
}: {
  /** "Report this video". */
  heading: string;
  doneHeading?: string;
  /** The thing being reported, named so the reporter can see they have the right one. */
  subject?: string;
  /** The question the reasons answer, for a screen reader. "What is wrong with this video?" */
  prompt: string;
  /** `null` while the list is still on its way. */
  reasons: ReportReason[] | null;
  /** Shown instead of the reasons when they could not be fetched. */
  reasonsError?: string | null;
  noteLabel?: string;
  notePlaceholder?: string;
  submitLabel?: string;
  /** Sends the report. Resolves to the message the reporter is shown; rejects with one they are shown instead. */
  onSubmit: (reason: string, note: string | undefined) => Promise<string>;
  onClose: () => void;
  /** Anything the product wants said above the reasons — a promise about privacy, say. */
  children?: ReactNode;
}) {
  const { t } = useLeoTranslations();
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dialog = useRef<HTMLDivElement>(null);

  // Escape closes it, which is what every dialog on the platform does and what
  // somebody who opened this by mistake will reach for first.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus moves into the dialog, so a keyboard or screen-reader user is not
  // left tabbing through the page behind it.
  useEffect(() => {
    dialog.current?.focus();
  }, []);

  async function send() {
    setSending(true);
    setError(null);

    try {
      setDone(await onSubmit(reason, note || undefined));
    } catch (thrown) {
      setError(
        thrown instanceof Error && thrown.message
          ? thrown.message
          : t("report.failed"),
      );
      setSending(false);
    }
  }

  const shownError = error ?? reasonsError ?? null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-scrim/40 p-0 sm:items-center sm:p-4"
      // A click on the backdrop closes it. The dialog itself stops the click,
      // just below, so choosing a reason does not dismiss what you are filling in.
      onClick={onClose}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-heading"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg rounded-t-3xl bg-surface p-6 shadow-lg outline-none sm:rounded-3xl"
      >
        <div className="mb-4 flex items-start gap-3">
          <h2 id="report-heading" className="text-xl font-normal text-on-surface">
            {done ? (doneHeading ?? t("report.done")) : heading}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("report.close")}
            className="ml-auto -mr-2 -mt-1 inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
          >
            <Icon name="close" className="size-5" />
          </button>
        </div>

        {done ? (
          <>
            {/*
              Deliberately says nothing about the thing: not how many others have
              flagged it, not whether it is already in the queue, not what we
              decided last time. What a reporter is owed is the truth that
              somebody will look, and that is the whole of what this says.
            */}
            <p className="text-sm text-on-surface-variant">{done}</p>

            <div className="mt-6 flex justify-end">
              <Button onClick={onClose}>{t("report.ok")}</Button>
            </div>
          </>
        ) : (
          <>
            {subject && (
              <p className="mb-4 truncate text-sm text-on-surface-variant" title={subject}>
                {subject}
              </p>
            )}

            {children}

            {shownError && (
              <div className="mb-4">
                <Alert tone="error">{shownError}</Alert>
              </div>
            )}

            <fieldset className="space-y-1">
              <legend className="sr-only">{prompt}</legend>

              {reasons === null ? (
                !reasonsError && <p className="text-sm text-on-surface-variant">{t("report.loading")}</p>
              ) : (
                reasons.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      reason === option.value
                        ? "bg-secondary-container text-on-secondary-container"
                        : "text-on-surface hover:bg-surface-container",
                    )}
                  >
                    <input
                      type="radio"
                      name="report-reason"
                      value={option.value}
                      checked={reason === option.value}
                      onChange={(event) => setReason(event.target.value)}
                      className="size-4 accent-primary"
                    />
                    {option.label}
                  </label>
                ))
              )}
            </fieldset>

            <div className="mt-4">
              <label htmlFor="report-note" className="text-xs font-medium text-on-surface-variant">
                {noteLabel ?? t("report.note")}
              </label>
              {/*
                Where the context a fixed list cannot carry goes. Short on
                purpose — a reviewer reading forty of these needs each one
                readable at a glance.
              */}
              <textarea
                id="report-note"
                rows={2}
                maxLength={500}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder={notePlaceholder}
                className="mt-1 block w-full rounded-lg border border-outline bg-transparent px-3 py-2 text-sm text-on-surface"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="text" onClick={onClose}>
                {t("report.cancel")}
              </Button>

              {/*
                Disabled without a reason rather than failing on submit. The
                server requires one and would refuse; finding that out after
                pressing is a worse way to learn it.
              */}
              <Button onClick={send} loading={sending} disabled={!reason}>
                {submitLabel ?? t("report.submit")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
