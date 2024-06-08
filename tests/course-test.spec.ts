import { test, expect } from "@playwright/test";
import { SignIn } from "./actions";
import path from "path";

test.describe("Course tests", () => {
  const longWait = {
    timeout: 30000,
  };
  const random = Math.random().toString(36).substring(7);
  const courseName = `Test Course ${random}`;
  const description = `Test Course Description ${random}`;
  const price = "100";
  const categoryName = "test";

  test.beforeEach(async ({ page }) => {
    await SignIn(page);
  });

  test("Create and edit Course", async ({ page }) => {
    await page.getByRole("link", { name: "Creator Panel" }).click();
    await page.getByRole("link", { name: "Create course" }).click();
    
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page
    .getByText("Choose files or drag and dropImage (16MB)Choose File")
    .click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "mocked-image.jpg"));
    await page.getByRole("button", { name: "Upload 1 file" }).click();
    
    await page.getByPlaceholder("Course name").fill(courseName);
    await page.getByPlaceholder("Course description").fill(description);
    await page.getByPlaceholder("Course price").fill(price);

    await page.getByLabel("Category").click();
    await page.getByLabel(categoryName).getByText(categoryName).click();

    await expect(page.getByText("Delete image")).toBeVisible(longWait);
    await page.locator('[data-test="creator-courses-create-button"]').click();
    await expect(page.getByText(`Course name: ${courseName}`)).toBeVisible(
      longWait
    );

    await page.locator('[data-test="create-chapter-button"]').click();
    await expect(page.getByText("Chapter added to course")).toBeVisible(longWait);

    await page.locator('[data-test="create-sub-chapter-button"]').first().click();
  });
});
