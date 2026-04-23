import { test } from "../fixtures.js";
import users from "../test-data/users.json";
test.describe("Authentication test-suites", () => {
  // TC - Login-1
  test(
    "login and logout with valid credentials - Admin user",
    { tag: ["@smoke", "@e2e"] },
    async ({ loginPage, dashboardPage, homePage }) => {
      await homePage.goToLoginPage();
      await loginPage.verifyLoginPageVisibility();
      await loginPage.login(
        process.env.VALID_EMAIL_ADMIN,
        process.env.VALID_PASSWORD_ADMIN,
      );
      await dashboardPage.verifyDashboardPageVisibility();
      await dashboardPage.logout();
      await loginPage.verifyLoginPageVisibility();
    },
  );

  // TC - Login-2
  users.forEach((user, i) => {
    test(
      `verify CTA case#${i + 1}`,
      { tag: "@smoke" },
      async ({ dashboardPage, loginPage, homePage }) => {
        await homePage.goToLoginPage();
        await loginPage.verifyLoginPageVisibility();
        await loginPage.login(user.email, user.password);
        await dashboardPage.verifyDashboardPageVisibility();
        await dashboardPage.logout();
        await loginPage.verifyLoginPageVisibility();
      },
    );
  });
});
