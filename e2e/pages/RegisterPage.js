export class RegisterPage {
  constructor(page) {
    this.page = page;

    // locators based on your UI
    this.nameInput = page.locator("//input[@id='name']");
    this.emailInput = page.locator("//input[@id='email']");
    this.passwordInput = page.locator("//input[@id='password']");

    this.signUpBtn = page.locator("//button[@type='submit']");
  }

  async fillForm(user) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit() {
    await this.signUpBtn.click();
  }

  async register(user) {
    await this.fillForm(user);
    await this.submit();
  }
}