import { test, expect } from "@playwright/test";
import { Layout } from "./pages/layout";
import { SignIn } from "./actions";

test.describe("Auth tests", () => {
  test("Log in - correct credentials", async ({ page }) => {
    await SignIn(page);
    await new Layout(page).isUserLogged();
  });

  test("Log in - incorrect credentials", async ({ page }) => {
    // Arrange
    await page.goto("/");
    const layout = new Layout(page);
    const loginPage = await layout.goToSignInPage();

    // Act
    await loginPage.signIn(process.env.TEST_LOGIN!, "incorrect");

    // Assert
    await expect(
      page.getByText("Password is incorrect. Try again, or use another method.")
    ).toBeVisible();
  });
});
