import { test } from "../fixtures.js";
import { expect } from "@playwright/test";


test.describe("Registration Features", () => {

    test("@smoke user can register successfully", async ({
        page,
        homePage,
        loginPage,
        registerPage,
       dashboardPage
    }) => {
        await page.goto("/");
        await homePage.goToLoginPage();
        await loginPage.goToRegister();

        const user = {
            name: "Test User",
            email: `testuser${Date.now()}@example.com`,
            password: "Password123!"
        };

        await registerPage.fillForm(user);

        await registerPage.submit();

        await dashboardPage.verifyDashboardPageVisibility();



    });


});

test("@regression register fails with invalid email", async ({
  page,
  homePage,
  loginPage,
  registerPage
}) => {

  await page.goto("/");
  await homePage.goToLoginPage();
  await loginPage.goToRegister();

  const user = {
    name: "Test User",
    email: "invalid-email",
    password: "Password123!"
  };

  await registerPage.fillForm(user);
  await registerPage.submit();

    
  
  await expect(registerPage.page.getByText(/invalid email/i)).toBeVisible();
});

