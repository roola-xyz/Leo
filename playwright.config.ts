import { defineConfig, devices } from 'playwright/test';

/**
 * ============================================================================
 * 🎭 PLAYWRIGHT CONFIGURATION
 * ============================================================================
 *
 * This configuration is used for:
 *  • Browser-based testing
 *  • Vitest browser mode (@vitest/browser-playwright)
 *  • Storybook interaction & visual tests
 *
 * Keep this file deterministic and CI-friendly.
 * ============================================================================
 */

export default defineConfig({
    testDir: "./src/components",
    testMatch: ["**/*.spec.ts"],

    use: {
        headless: true,
        baseURL: 'http://localhost:6006',
        // viewport: { width: 1280, height: 720 },

        trace: "on-first-retry",
        video: "retain-on-failure",
        screenshot: "only-on-failure",

        actionTimeout: 10_000,
        navigationTimeout: 40_000,
    },


    timeout: 30_000,

    expect: {
        timeout: 20_000,
    },

    fullyParallel: true,

    forbidOnly: !!process.env["CI"],

    retries: process.env["CI"] ? 2 : 0,

    workers: process.env["CI"] ? 1 : undefined,

    reporter: [
        ["list"],
        ["html", { outputFolder: "coverage/playwright-report", open: process.env["CI"] ? "never" : "always" }],
    ],


    projects: [
        
       /**
         * ============================================================================
         * 🎭 DESKTOP BROWSER ENGINE CONFIGURATION
         * ============================================================================
         */
        {
            name: "Chromium",
            use: {
                ...devices["Desktop Chrome"],
            },
        },
        {
            name: "Firefox",
            use: {
                ...devices["Desktop Firefox"],
            },
        },
        {
            name: "WebKit",
            use: {
                ...devices["Desktop Safari"],
            },
        },

        
        /**
         * ============================================================================
         * 🎭 BRANDED BROWSER CONFIGURATION
         * ============================================================================
         */
        {
            name: 'Microsoft Edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
            },
        },
        {
            name: 'Google Chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
            },
        },
        {
            name: "Mozilla Firefox",
            use: {
                ...devices["Desktop Firefox"],
                channel: 'firefox',
            },
        },


        /**
         * ============================================================================
         * 🎭 APPLE IPAD MINI CONFIGURATION
         * ============================================================================
         */
        {
            name: 'Safari Browser on iPad Mini 5 (Portrait)',
            use: { 
                ...devices['iPad Mini 5'],
                browserName: 'webkit',
                viewport: { width: 768, height: 1024 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
     
            },
        },
        {
            name: 'Safari Browser on iPad Mini 5 (Landscape)',
            use: {
                ...devices['iPad Mini 5 Landscape'],
                browserName: 'webkit',
                viewport: { height: 768, width: 1024 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
            },
        },

        
        {
            name: 'Chromium Browser on iPad Mini 5 (Portrait)',
            use: { 
                ...devices['iPad Mini 5'],
                browserName: 'chromium',
                viewport: { width: 768, height: 1024 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                // userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
     
            },
        },
        {
            name: 'Chromium Browser on iPad Mini 5 (Landscape)',
            use: {
                ...devices['iPad Mini 5 Landscape'],
                browserName: 'chromium',
                viewport: { height: 768, width: 1024 },
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                // userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
            },
        },

        
        {
            name: 'Firefox Browser on iPad Mini 5 (Portrait)',
            use: { 
                ...devices['iPad Mini 5'],
                browserName: 'firefox',
                viewport: { width: 768, height: 1024 },
                deviceScaleFactor: 2,
                // isMobile: true,
                hasTouch: true,
                // userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
     
            },
        },
        {
            name: 'Firefox Browser on iPad Mini 5 (Landscape)',
            use: {
                ...devices['iPad Mini 5 Landscape'],
                browserName: 'firefox',
                viewport: { height: 768, width: 1024 },
                deviceScaleFactor: 2,
                // isMobile: true,
                hasTouch: true,
                // userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
            },
        },


        /**
         * ============================================================================
         * 🎭 APPLE IPAD PRO CONFIGURATION
         * ============================================================================
         */
        {
            name: 'iPad Pro 9.7 (Portrait)',
            use: { 
                ...devices['iPad Pro 9.7'] 
            },
        },
        {
            name: 'iPad Pro 9.7 (Landscape)',
            use: {
                ...devices['iPad Pro 9.7 Landscape'],
            },
        },
        {
            name: 'iPad Pro 10.5 (Portrait)',
            use: { 
                ...devices['iPad Pro 10.5'] 
            },
        },
        {
            name: 'iPad Pro 10.5 (Landscape)',
            use: {
                ...devices['iPad Pro 10.5 Landscape'],
            },
        },
        {
            name: 'iPad Pro 11 (Portrait)',
            use: { 
                ...devices['iPad Pro 11'] 
            },
        },
        {
            name: 'iPad Pro 11 (Landscape)',
            use: {
                ...devices['iPad Pro 11 Landscape'],
            },
        },
        {
            name: 'iPad Pro 12.9 (Portrait)',
            use: { 
                ...devices['iPad Pro 12.9'] 
            },
        },
        {
            name: 'iPad Pro 12.9 (Landscape)',
            use: {
                ...devices['iPad Pro 12.9 Landscape'],
            },
        },
        {
            name: 'iPad Pro 12.9 (Portrait)',
            use: { 
                ...devices['iPad Pro 12.9'] 
            },
        },
        {
            name: 'iPad Pro 13 (Landscape)',
            use: {
                ...devices['iPad Pro 13 Landscape'],
            },
        },



        /**
         * ============================================================================
         * 🎭 GLALAXY TABLET CONFIGURATION
         * ============================================================================
         */
        {
            name: 'Galaxy Tab S4',
            use: { 
                ...devices['Galaxy Tab S4'] 
            },
        },



        /**
         * ============================================================================
         * 🎭 APPLE IPHONE CONFIGURATION
         * ============================================================================
         */
        {
            name: 'iPhone 6S',
            use: {
                ...devices['iPhone 6S'],
            },
        },
        {
            name: 'iPhone 7',
            use: {
                ...devices['iPhone 7'],
            },
        },
        {
            name: 'iPhone 8',
            use: {
                ...devices['iPhone 8'],
            },
        },
        {
            name: 'iPhone 9',
            use: {
                ...devices['iPhone 9'],
            },
        },
        {
            name: 'iPhone 10',
            use: {
                ...devices['iPhone 10'],
            },
        },
        {
            name: 'iPhone 11',
            use: {
                ...devices['iPhone 11'],
            },
        },
        {
            name: 'iPhone 12',
            use: {
                ...devices['iPhone 12'],
            },
        },
        {
            name: 'iPhone 13',
            use: {
                ...devices['iPhone 13'],
            },
        },
        {
            name: 'iPhone 14',
            use: {
                ...devices['iPhone 14'],
            },
        },
        {
            name: 'iPhone 15',
            use: {
                ...devices['iPhone 15'],
            },
        },
        {
            name: 'iPhone 16',
            use: {
                ...devices['iPhone 16'],
            },
        },
        {
            name: 'iPhone 17',
            use: {
                ...devices['iPhone 17'],
            },
        },
        {
            name: 'iPhone 17 Pro',
            use: {
                ...devices['iPhone 17 Pro'],
            },
        },


        
        /**
         * ============================================================================
         * 🎭 GOOGLE PIXEL CONFIGURATION
         * ============================================================================
         */
        {
            name: 'Pixel 7',
            use: {
                ...devices['Pixel 7'],
            },
        },
        {
            name: 'Pixel 8',
            use: {
                ...devices['Pixel 8'],
            },
        },
        {
            name: 'Pixel 9',
            use: {
                ...devices['Pixel 9'],
            },
        },
        {
            name: 'Pixel 10',
            use: {
                ...devices['Pixel 10'],
            },
        },
        {
            name: 'Pixel 10 Pro',
            use: {
                ...devices['Pixel 10 Pro'],
            },
        },
    ],

    webServer: {
        command: "pnpm storybook",
        url: "http://localhost:6006",
        reuseExistingServer: !process.env["CI"],
        timeout: 120_000,
    },
});




// import { defineConfig, devices } from '@playwright/test';

// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',

//   /* Shared settings for all the projects below. */
//   use: {
//     /* Base URL to use in actions like await page.goto('/'). */
//     baseURL: 'http://localhost:3000',

//     /* --- Artifact Settings --- */
//     // Capture screenshot after each test failure.
//     screenshot: 'only-on-failure',
//     // Record trace only when retrying a test for the first time.
//     trace: 'on-first-retry',
//     // Record video only when retrying a test for the first time.
//     video: 'on-first-retry',
    
//     /* --- Behavioral Settings --- */
//     actionTimeout: 10 * 1000, // 10s limit for clicks/typing
//     navigationTimeout: 30 * 1000, // 30s limit for page loads
//   },

//   /* Configure projects for major browsers and devices */
//   projects: [
//     /* 1. Desktop Browsers */
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* 2. Mobile Viewports (Phones) */
//     {
//       name: 'Mobile Chrome (Pixel 7)',
//       use: { ...devices['Pixel 7'] },
//     },
//     {
//       name: 'Mobile Safari (iPhone 14)',
//       use: { ...devices['iPhone 14'] },
//     },

//     /* 3. Tablet Viewports */
//     {
//       name: 'iPad Pro 11 (Portrait)',
//       use: { ...devices['iPad Pro 11'] },
//     },
//     {
//       name: 'iPad Pro 11 (Landscape)',
//       use: { ...devices['iPad Pro 11 landscape'] },
//     },
//     {
//       name: 'Galaxy Tab S4',
//       use: { ...devices['Galaxy Tab S4'] },
//     },

//     /* 4. Branded Browsers (Stable Channels) */
//     {
//       name: 'Microsoft Edge',
//       use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     },
//     {
//       name: 'Google Chrome',
//       use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     },
//   ],
// });


// export default defineConfig({
//   projects: [
//     {
//       name: 'ipad-mini-5',
//       use: {
//         browserName: 'webkit',
//         viewport: { width: 768, height: 1024 },
//         deviceScaleFactor: 2,
//         isMobile: true,
//         hasTouch: true,
//         userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
//       },
//     },
//   ],
// });