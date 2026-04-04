// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 */
const env = process.env.ENV || "test";
dotenv.config({ path: path.resolve(__dirname, `.env.${env}`) });

export default defineConfig({
  testDir: "./e2e/tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  /* Shared settings */
  use: {
    // Falls back to localhost if BASE_URL isn't in env
    baseURL: process.env.BASE_URL || "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* CRITICAL: This boots the app in GitHub Actions.
     GitHub cannot see your local machine, so it builds its own version.
  */
  webServer: {
    // 1. Build and start the app (standard for CI)
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    // 2. The URL where the app will live
    url: "http://127.0.0.1:3000",
    // 3. If running locally and your app is already open, it won't try to start it again
    reuseExistingServer: !process.env.CI,
    // 4. Give the build step enough time to finish (2 minutes)
    timeout: 120 * 1000,
    // 5. Ensure the server inherits your environment variables
    env: {
      NODE_ENV: "test",
    },
  },
});
