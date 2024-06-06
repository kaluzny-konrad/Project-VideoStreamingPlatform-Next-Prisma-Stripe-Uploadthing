import { type Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async signIn(login?: string, password?: string) {
    const page = this.page;
    await page.waitForLoadState("domcontentloaded");
    await page
      .getByLabel("Adres e-mail")
      .fill(login || process.env.TEST_LOGIN!);
    await page.getByRole("button", { name: "Kontynuuj", exact: true }).click();
    await page.getByLabel("Hasło").fill(password || process.env.TEST_PASSWORD!);
    await page.getByRole("button", { name: "Kontynuuj" }).click();
  }
}
