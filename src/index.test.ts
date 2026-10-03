import { describe, expect, it } from "vitest";
import * as leo from "./index";

describe("the package entry", () => {
  it("exports the primitives, the composites, the hooks and the translation machinery", () => {
    for (const name of [
      "cn",
      "LANGUAGES",
      "LocaleProvider",
      "createTranslations",
      "useLeoTranslations",
      "parse",
      "Alert",
      "Button",
      "Chart",
      "Menu",
      "AppsMenu",
      "ReportDialog",
      "UserMenu",
      "VerificationToast",
      "WaitingList",
      "PlatformGate",
      "joinThroughAccounts",
      "PushSwitch",
      "useLocalePreference",
      "useScrolled",
      "usePush",
    ]) {
      expect(leo, name).toHaveProperty(name);
    }
  });
});
