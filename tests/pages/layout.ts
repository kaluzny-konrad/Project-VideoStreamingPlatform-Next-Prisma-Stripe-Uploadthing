import { expect, type Locator, type Page } from "@playwright/test";
import { SignInPage } from "./sign-in-page";
import { AdminPage } from "./admin-page";

export class Layout {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToSignInPage(): Promise<SignInPage> {
    const page = this.page;
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/sign-in/);
    return new SignInPage(page);
  }

  async goToAdminPage(): Promise<AdminPage> {
    const page = this.page;
    await page.getByRole("link", { name: "Admin Panel" }).click();
    await expect(page).toHaveURL(/\/admin/);
    return new AdminPage(page);
  }

  async isUserLogged(login?: string) {
    const page = this.page;
    await page.getByLabel("Open user button").click();
    await expect(page.getByLabel("User button popover")).toContainText(
      login || process.env.TEST_LOGIN!
    );
    await page.getByLabel("Close user button").click();
  }
}
