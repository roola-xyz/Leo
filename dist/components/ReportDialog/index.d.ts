import { ReactNode } from 'react';
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
export declare function ReportDialog({ heading, doneHeading, subject, prompt, reasons, reasonsError, noteLabel, notePlaceholder, submitLabel, onSubmit, onClose, children, }: {
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
}): import("react").JSX.Element;
