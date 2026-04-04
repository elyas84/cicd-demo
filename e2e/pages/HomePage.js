import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.getStartedButton = page.locator(
      "//a[@testdata-id='get-started-button']",
    );
  }

  /**
   * Go to login page
   */

  async goToLoginPage() {
    await this.validateElementIsDisplayed(this.getStartedButton);
    await this.waitAndClick(this.getStartedButton);
  }
}
