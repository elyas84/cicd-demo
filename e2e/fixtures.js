import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    if (!process.env.BASE_URL) {
      throw new Error(
        "BASE_URL is undefined. Check if .env.test is formatted correctly and located in the root.",
      );
    }
    await page.goto("/");
    if (process.env.ENV === "prod") {
      if (page.url() != process.env.BASE_URL) {
        await page.goto("/");
      }
    }

    // run the tests
    await use(page);
    // taking screenshot
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        // attaching testName along with screenshot for readability
        path: "e2e/test-output/" + testInfo.title + ".png",
        fullPage: true,
      });
    }
    await page.close();
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});
