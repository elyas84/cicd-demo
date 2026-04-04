import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.dasboardPageTitle = page.locator("//h1[text()='Dashboard']");
    this.logoutButton = page.locator("//button[text()='Log out']");
  }

  /**
   * verify dashboard page visibility
   */

  async verifyDashboardPageVisibility() {
    await this.validateElementIsDisplayed(this.dasboardPageTitle);
    await this.validateURL("/dashboard");
  }

  /**
   * logout
   */

  async logout() {
    await this.waitAndClick(this.logoutButton);
  }
  /**
   * TODO: Add more dashboard page related methods here
   */
}
