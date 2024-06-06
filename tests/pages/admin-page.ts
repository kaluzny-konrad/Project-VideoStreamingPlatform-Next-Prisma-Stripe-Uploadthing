import { expect, type Locator, type Page } from "@playwright/test";

export class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async createCategory(categoryName: string, slug: string) {
    const page = this.page;
    await page.getByRole("link", { name: "Create category" }).click();
    await page.getByPlaceholder("Category name").fill(categoryName);
    await page.getByPlaceholder("Slug").fill(slug);
    await page.locator('[data-test="admin-categories-create-button"]').click();
    await expect(page.getByText("Edit category")).toBeVisible({
      timeout: 30000,
    });
  }

  async deleteCategory(slug: string) {
    const page = this.page;
    await page.getByRole("link", { name: "List of categories" }).click();
    await page
      .locator(`[data-test="category-row-${slug}"]`)
      .locator('[data-test="admin-categories-delete-button"]')
      .click();
    await expect(page.getByText("Category deleted")).toBeHidden();
  }

  async isCategoryHidden(slug: string) {
    const page = this.page;
    await expect(
      page.locator(`[data-test="category-row-${slug}"]`)
    ).toBeHidden();
  }

  async isCategoryVisible(categoryName: string) {
    const page = this.page;
    await expect(
      page.getByText(`Category name: ${categoryName}`)
    ).toBeVisible();
  }
}
