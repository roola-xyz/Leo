import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";


const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({

  // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
  test: {



    // globals: true,
    // environment: "happy-dom",
    // setupFiles: "./.storybook/vitest.setup.ts",
    // include: [
    //   'src/**/*.test.@(ts|tsx',
    //   'src/**/*.spec.@(ts|tsx',
    // ],



    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "lcov", 'html'],
      reportsDirectory: "coverage",
      // Every source file, whether or not a test happened to load it, so the
      // figure is the share of the library that is tested, not of what ran.
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.stories.{ts,tsx}", "src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}", "src/**/*.d.ts"],
    },




    projects: [


      {
        extends: true,
        test: {
          name: "unit",
          environment: "happy-dom",
          browser: { enabled: false },
          exclude: ["src/**/*.spec.ts"],
          setupFiles: "./vitest.setup.ts",
          include: ["src/**/*.test.@(ts|tsx)"],
        },
      },


      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "browser",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
          exclude: ["src/stories/**"],
        },
      },

    ],
  },

});
