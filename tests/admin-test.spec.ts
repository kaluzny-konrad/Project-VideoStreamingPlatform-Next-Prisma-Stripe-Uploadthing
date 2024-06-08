import { test } from "@playwright/test";
import {
  CreateCategory,
  DeleteCategory,
  OpenAdminPage,
  SignIn,
} from "./actions";

test.describe("Admin functions tests", () => {
  const random = Math.random().toString(36).substring(7);
  const slug = `testcategory${random}`;
  const categoryName = `Test Category ${random}`;

  test.beforeEach(async ({ page }) => {
    await SignIn(page);
  });

  test("Create and delete category", async ({ page }) => {
    await OpenAdminPage(page);
    await CreateCategory(page, categoryName, slug);
    await DeleteCategory(page, slug);
  });
});
