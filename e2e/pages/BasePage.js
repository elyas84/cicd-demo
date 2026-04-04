import { expect } from "@playwright/test";

export class BasePage {
  constructor(page) {
    this.page = page;
    // locators
  }

  /**
   * Navigate to a specific URL
   */

  async navigateTo(url) {
    await this.page.goto(url);
  }

  /**
   *  validate if element is displayed
   */

  async validateElementIsDisplayed(element) {
    await element.waitFor();
    await expect(element).toBeVisible();
  }

  /**
   * wait and click on the element
   */

  async waitAndClick(element) {
    await this.validateElementIsDisplayed(element);
    await element.click();
  }

  /**
   * wait and type on the element
   */
  async waitAndType(element, text) {
    await this.validateElementIsDisplayed(element);
    await element.fill(text);
  }
  /**
   * valite the visibllity of the list of elements
   */

  async validateListOfElementsVisibility(elements) {
    for (let i = 0; i < (await elements.count()); i++) {
      await this.validateElementIsDisplayed(await elements.nth(i));
    }
  }

  /**
   * get array of elements text content
   */
  async getArrayOfElementsText(elements) {
    const elementsText = [];
    for (let i = 0; i < (await elements.count()); i++) {
      elementsText.push(await elements.nth(i).textContent());
    }
    return elementsText;
  }

  /**
   * get text of the element
   */
  async getElementText(element) {
    await this.validateElementIsDisplayed(element);
    return await element.textContent();
  }

  /**
   * validate the page has navigated to the expected URL with regex
   */
  async validateURL(url) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }
}
