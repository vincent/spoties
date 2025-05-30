import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: false,
    // viewport: { width: 1280, height: 768 },
    // video: "on-first-retry",
    // make sure "npm run dev" is running for localhost:5173 to work
    baseURL: process.env.CI ? "https://spoti.es" : "http://localhost:5173",
  },
  testDir: "tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["html", { open: "never" }]]
    : [["html", { open: "on-failure" }]],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

export default config;
