import { Button } from "../Button";
import { usePush, type PushApi } from "../../hooks/usePush";

/**
 * The switch for "ring my telephone", with the sentence that goes with it.
 *
 * Five states, drawn as one row. A browser that cannot do it and a product
 * that has not turned it on get a sentence rather than a dead switch; a
 * person who said no at the browser's own prompt gets told that only they
 * can change that, because no button of ours can. The switch itself appears
 * only in the two states where pressing it does something.
 */
export function PushSwitch({
  publicKey,
  available,
  api,
  title = "Notifications",
  describes,
  labels,
}: {
  publicKey: string | null | undefined;
  available: boolean;
  api: PushApi;
  title?: string;
  /** What will be sent, in a sentence: "when something you reported is reviewed". */
  describes: string;
  labels?: Partial<{
    on: string;
    off: string;
    turnOn: string;
    turnOff: string;
    unsupported: string;
    unavailable: string;
    blocked: string;
  }>;
}) {
  const { state, working, enable, disable } = usePush(publicKey, available, api);

  const text = {
    on: "On. We will ring this browser.",
    off: "Off.",
    turnOn: "Turn on",
    turnOff: "Turn off",
    unsupported: "This browser cannot show notifications from a website.",
    unavailable: "Not available here yet.",
    blocked: "You have blocked notifications for this site in your browser. Only the browser's own settings can change that.",
    ...labels,
  };

  return (
    <div className="flex flex-wrap items-start justify-between gap-3 rounded-field bg-surface-container px-4 py-3">
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium text-on-surface">{title}</p>
        <p className="text-xs leading-4 text-on-surface-variant">{describes}</p>
        <p className="text-xs leading-4 text-on-surface-variant" role="status">
          {state === "unsupported" && text.unsupported}
          {state === "unavailable" && text.unavailable}
          {state === "blocked" && text.blocked}
          {state === "on" && text.on}
          {state === "off" && text.off}
        </p>
      </div>

      {state === "off" && (
        <Button variant="tonal" className="h-9 px-4" loading={working} onClick={enable}>
          {text.turnOn}
        </Button>
      )}

      {state === "on" && (
        <Button variant="outlined" className="h-9 px-4" loading={working} onClick={disable}>
          {text.turnOff}
        </Button>
      )}
    </div>
  );
}
