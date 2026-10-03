import { useCallback, useEffect, useState } from "react";

/**
 * Web push, from the browser's side.
 *
 * ## What the estate does with it
 *
 * A product that wants to ring somebody's telephone when the site is not
 * open — a bill moved, the thing you reported was reviewed — needs the
 * browser to make a subscription with the product's public key and hand it
 * to the product's API. That is all this does: ask, subscribe, hand over,
 * and the reverse. The product supplies the two API calls, because they live
 * on its origin; the hook is the same everywhere.
 *
 * ## The five states
 *
 * `unsupported` is the browser (no service worker, no push); `unavailable`
 * is the product (no keys configured); `blocked` is the person having said
 * no at the browser prompt, which only they can undo; `off` and `on` are the
 * switch. The interface shows a switch for the last two and a sentence for
 * the first three.
 */
export type PushState = "unsupported" | "unavailable" | "blocked" | "off" | "on";

export interface PushApi {
  subscribe: (input: { endpoint: string; public_key: string; auth_token: string }) => Promise<unknown>;
  unsubscribe: (endpoint: string) => Promise<unknown>;
}

const SUPPORTED =
  typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;

export function usePush(publicKey: string | null | undefined, available: boolean, api: PushApi, workerPath = "/sw.js") {
  const [state, setState] = useState<PushState>("unsupported");
  const [working, setWorking] = useState(false);

  const read = useCallback(async () => {
    if (!SUPPORTED) return setState("unsupported");
    if (!available || !publicKey) return setState("unavailable");
    if (Notification.permission === "denied") return setState("blocked");

    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();

    setState(subscription ? "on" : "off");
  }, [available, publicKey]);

  useEffect(() => {
    void read();
  }, [read]);

  const enable = useCallback(async () => {
    if (!SUPPORTED || !publicKey) return;

    setWorking(true);

    try {
      const registration = await navigator.serviceWorker.register(workerPath);
      await navigator.serviceWorker.ready;

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setState(permission === "denied" ? "blocked" : "off");

        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeKey(publicKey),
      });

      const json = subscription.toJSON();

      await api.subscribe({
        endpoint: subscription.endpoint,
        public_key: json.keys?.p256dh ?? "",
        auth_token: json.keys?.auth ?? "",
      });

      setState("on");
    } catch {
      await read();
    } finally {
      setWorking(false);
    }
  }, [publicKey, api, read, workerPath]);

  const disable = useCallback(async () => {
    setWorking(true);

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();

      if (subscription) {
        await api.unsubscribe(subscription.endpoint).catch(() => undefined);
        await subscription.unsubscribe();
      }

      setState("off");
    } finally {
      setWorking(false);
    }
  }, [api]);

  return { state, working, enable, disable };
}

/** The VAPID public key, base64url on the wire and bytes to the browser. */
function decodeKey(base64Url: string): ArrayBuffer {
  const padded = base64Url.padEnd(base64Url.length + ((4 - (base64Url.length % 4)) % 4), "=");
  const raw = window.atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(raw.length);

  for (let index = 0; index < raw.length; index += 1) bytes[index] = raw.charCodeAt(index);

  return bytes.buffer;
}
