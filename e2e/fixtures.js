import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await page.goto("/");
    if ((process.env.ENV = "prod")) {
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
});
