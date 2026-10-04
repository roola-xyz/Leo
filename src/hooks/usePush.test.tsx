import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PushApi } from "./usePush";

/**
 * A browser that can do push, with every part of it a fake the test steers.
 * `usePush` decides whether the browser supports push when it is first
 * loaded, so each test loads it afresh after laying the browser down.
 */
function browser({ permission = "default" as NotificationPermission, subscribed = false } = {}) {
  const subscription = {
    endpoint: "https://push.example.test/abc",
    toJSON: () => ({ keys: { p256dh: "public-bytes", auth: "secret-bytes" } }),
    unsubscribe: vi.fn(() => Promise.resolve(true)),
  };

  const pushManager = {
    getSubscription: vi.fn(() => Promise.resolve(subscribed ? subscription : null)),
    subscribe: vi.fn(() => {
      subscribed = true;
      return Promise.resolve(subscription);
    }),
  };

  const registration = { pushManager };

  const serviceWorker = {
    getRegistration: vi.fn(() => Promise.resolve(registration)),
    register: vi.fn(() => Promise.resolve(registration)),
    ready: Promise.resolve(registration),
  };

  const notification = {
    permission,
    requestPermission: vi.fn(() => Promise.resolve<NotificationPermission>("granted")),
  };

  Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: serviceWorker });
  vi.stubGlobal("PushManager", class {});
  vi.stubGlobal("Notification", notification);

  return { subscription, pushManager, serviceWorker, notification };
}

function api(): PushApi & { subscribe: ReturnType<typeof vi.fn>; unsubscribe: ReturnType<typeof vi.fn> } {
  return {
    subscribe: vi.fn(() => Promise.resolve()),
    unsubscribe: vi.fn(() => Promise.resolve()),
  };
}

async function load() {
  vi.resetModules();

  return (await import("./usePush")).usePush;
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  delete (navigator as unknown as Record<string, unknown>).serviceWorker;
  vi.unstubAllGlobals();
});

describe("usePush", () => {
  it("is unsupported in a browser without service workers or push", async () => {
    delete (navigator as unknown as Record<string, unknown>).serviceWorker;
    const usePush = await load();

    const { result } = renderHook(() => usePush("key", true, api()));

    await waitFor(() => expect(result.current.state).toBe("unsupported"));
  });

  it("is unavailable when the product has no key or has not turned it on", async () => {
    browser();
    const usePush = await load();

    const withoutKey = renderHook(() => usePush(null, true, api()));
    const switchedOff = renderHook(() => usePush("key", false, api()));

    await waitFor(() => expect(withoutKey.result.current.state).toBe("unavailable"));
    await waitFor(() => expect(switchedOff.result.current.state).toBe("unavailable"));
  });

  it("is blocked when the person said no at the browser's prompt", async () => {
    browser({ permission: "denied" });
    const usePush = await load();

    const { result } = renderHook(() => usePush("key", true, api()));

    await waitFor(() => expect(result.current.state).toBe("blocked"));
  });

  it("is on when this browser already holds a subscription, and off when it does not", async () => {
    browser({ subscribed: true });
    const usePush = await load();

    const { result } = renderHook(() => usePush("key", true, api()));

    await waitFor(() => expect(result.current.state).toBe("on"));
  });

  it("is off when no worker has been registered yet", async () => {
    const fake = browser();
    fake.serviceWorker.getRegistration.mockResolvedValue(undefined as never);
    const usePush = await load();

    const { result } = renderHook(() => usePush("key", true, api()));

    await waitFor(() => expect(result.current.state).toBe("off"));
  });

  it("subscribes with the product's key and hands the subscription over", async () => {
    const fake = browser();
    const product = api();
    const usePush = await load();

    // "AQAB" in base64url, missing its padding, is the three bytes 1, 0, 1.
    const { result } = renderHook(() => usePush("AQAB-_8", true, product, "/worker.js"));

    await waitFor(() => expect(result.current.state).toBe("off"));
    await act(() => result.current.enable());

    expect(fake.serviceWorker.register).toHaveBeenCalledWith("/worker.js");
    const options = (fake.pushManager.subscribe.mock.calls[0] as unknown[])[0] as PushSubscriptionOptionsInit;
    expect(options.userVisibleOnly).toBe(true);
    expect([...new Uint8Array(options.applicationServerKey as ArrayBuffer)]).toEqual([1, 0, 1, 251, 255]);
    expect(product.subscribe).toHaveBeenCalledWith({
      endpoint: "https://push.example.test/abc",
      public_key: "public-bytes",
      auth_token: "secret-bytes",
    });
    expect(result.current.state).toBe("on");
    expect(result.current.working).toBe(false);
  });

  it("sends empty keys when the browser's subscription carries none", async () => {
    const fake = browser();
    fake.subscription.toJSON = () => ({}) as never;
    const product = api();
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, product));

    await waitFor(() => expect(result.current.state).toBe("off"));
    await act(() => result.current.enable());

    expect(product.subscribe).toHaveBeenCalledWith({ endpoint: "https://push.example.test/abc", public_key: "", auth_token: "" });
  });

  it("is blocked when the prompt is refused, and stays off when it is dismissed", async () => {
    const fake = browser();
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, api()));
    await waitFor(() => expect(result.current.state).toBe("off"));

    fake.notification.requestPermission.mockResolvedValueOnce("default");
    await act(() => result.current.enable());
    expect(result.current.state).toBe("off");

    fake.notification.requestPermission.mockResolvedValueOnce("denied");
    await act(() => result.current.enable());
    expect(result.current.state).toBe("blocked");
    expect(fake.pushManager.subscribe).not.toHaveBeenCalled();
  });

  it("says what is true when the product refuses the subscription", async () => {
    browser();
    const product = api();
    product.subscribe.mockRejectedValue(new Error("500"));
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, product));
    await waitFor(() => expect(result.current.state).toBe("off"));

    await act(() => result.current.enable());

    // The browser did subscribe, so a fresh read finds the subscription.
    expect(result.current.state).toBe("on");
    expect(result.current.working).toBe(false);
  });

  it("does nothing when asked to enable without a key", async () => {
    const fake = browser();
    const usePush = await load();

    const { result } = renderHook(() => usePush(null, true, api()));

    await act(() => result.current.enable());

    expect(fake.serviceWorker.register).not.toHaveBeenCalled();
  });

  it("unsubscribes at the product and in the browser", async () => {
    const fake = browser({ subscribed: true });
    const product = api();
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, product));
    await waitFor(() => expect(result.current.state).toBe("on"));

    await act(() => result.current.disable());

    expect(product.unsubscribe).toHaveBeenCalledWith("https://push.example.test/abc");
    expect(fake.subscription.unsubscribe).toHaveBeenCalled();
    expect(result.current.state).toBe("off");
  });

  it("lets go in the browser even when the product could not be told", async () => {
    const fake = browser({ subscribed: true });
    const product = api();
    product.unsubscribe.mockRejectedValue(new Error("offline"));
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, product));
    await waitFor(() => expect(result.current.state).toBe("on"));

    await act(() => result.current.disable());

    expect(fake.subscription.unsubscribe).toHaveBeenCalled();
    expect(result.current.state).toBe("off");
  });

  it("is off when there was nothing to unsubscribe", async () => {
    browser();
    const product = api();
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, product));

    await act(() => result.current.disable());

    expect(product.unsubscribe).not.toHaveBeenCalled();
    expect(result.current.state).toBe("off");
  });

  /**
   * The browser refusing to drop its subscription used to reject the promise
   * the switch's click handler returned, unhandled, and leave the switch
   * wherever it was. It now settles, and the state is read back from the browser.
   */
  it("settles and reads the state back when the browser will not let go", async () => {
    const fake = browser({ subscribed: true });
    fake.subscription.unsubscribe.mockRejectedValue(new Error("stuck"));
    const usePush = await load();

    const { result } = renderHook(() => usePush("AQAB", true, api()));
    await waitFor(() => expect(result.current.state).toBe("on"));

    await act(async () => {
      await expect(result.current.disable()).resolves.toBeUndefined();
    });

    expect(result.current.state).toBe("on");
    expect(result.current.working).toBe(false);
  });
});
