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
export declare function VerificationToast({ verification, onApprove, onDeny, onLapse }: Props): import("react").JSX.Element;
export {};
