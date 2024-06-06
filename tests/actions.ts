import { Page } from "@playwright/test";
import { SignInPage } from "./pages/sign-in-page";
import { AdminPage } from "./pages/admin-page";
import { Layout } from "./pages/layout";

export async function SignIn(page: Page) {
  await page.goto("/sign-in");
  await new SignInPage(page).signIn();
}

export async function OpenAdminPage(page: Page) {
  const layout = new Layout(page);
  await layout.goToAdminPage();
}

export async function CreateCategory(
  page: Page,
  categoryName: string,
  slug: string
) {
  const adminPage = new AdminPage(page);
  await adminPage.createCategory(categoryName, slug);
  await adminPage.isCategoryVisible(categoryName);
}

export async function DeleteCategory(page: Page, slug: string) {
  const adminPage = new AdminPage(page);
  await adminPage.deleteCategory(slug);
  await adminPage.isCategoryHidden(slug);
}
