import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4177",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "python3 -m http.server 4177 --bind 127.0.0.1 --directory dist",
    url: "http://127.0.0.1:4177",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: "mobile-360",
      use: { ...devices["Desktop Chrome"], viewport: { width: 360, height: 800 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "mobile-375",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "mobile-390",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "mobile-412",
      use: { ...devices["Desktop Chrome"], viewport: { width: 412, height: 915 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "desktop-1920",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: "visual",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } },
      testMatch: /visual\.spec\.ts/,
    },
  ],
});
