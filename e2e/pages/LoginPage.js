import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginSectionTitle = page.locator("//h2[text()='Sign in']");
    this.emailInput = page.locator("//input[@id='email']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//button[@type='submit']");
    this.createAccountLink = page.locator("//a[text()='Create an account']");
    this.loginErrorMessage = page.locator(
      "//p[@testdata-id='login-error-message'] ",
    );
  }

  /**
   * Verify login page visibility by checking the presence of key elements on the login page
   */
  async verifyLoginPageVisibility() {
    await this.validateElementIsDisplayed(this.loginSectionTitle);
    await this.validateElementIsDisplayed(this.emailInput);
    await this.validateElementIsDisplayed(this.passwordInput);
    await this.validateElementIsDisplayed(this.loginButton);
    await this.validateElementIsDisplayed(this.createAccountLink);
  }

  /**
   * Login to the application
   */

  async login(email, password) {
    await this.waitAndType(this.emailInput, email);
    await this.waitAndType(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
  }

  /**
   * Get login error message and validate it on invalid login attempt
   */
  async validateErrorMessageOnInvalidLogin() {
    await this.validateElementIsDisplayed(this.loginErrorMessage);
    return await this.loginErrorMessage.textContent();
  }

  async goToRegister() {
  await this.validateElementIsDisplayed(this.createAccountLink);
  await this.waitAndClick(this.createAccountLink);
  }
  
}


