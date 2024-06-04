import { test, expect } from "@playwright/test";
import path from "path";

test("test", async ({ page }) => {
  const random = Math.random().toString(36).substring(7);
  const courseName = `Course ${random}`;
  const categoryName = `Test Category ${random}`;
  const longWait = {
    timeout: 30000,
  };

  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByLabel("Adres e-mail").fill("konrad.kaluzny@hotmail.com");
  await page.getByRole("button", { name: "Kontynuuj", exact: true }).click();
  await page.getByLabel("Hasło").fill("Irritate-Manpower-Eloquent6");
  await page.getByRole("button", { name: "Kontynuuj" }).click();
  await page.getByLabel("Open user button").click();
  await expect(page.getByLabel("User button popover")).toContainText(
    "konrad.kaluzny@hotmail.com"
  );
  await page.getByLabel("Close user button").click();

  await page.getByRole("link", { name: "Admin Panel" }).click();
  await page.getByRole("link", { name: "Create category" }).click();
  await page.getByPlaceholder("Category name").fill(categoryName);
  await page.getByPlaceholder("Slug").fill(`testcategory${random}`);
  await page.locator('[data-test="admin-categories-create-button"]').click();
  await expect(page.getByText(categoryName)).toBeVisible(longWait);

  await page.getByRole("link", { name: "Creator Panel" }).click();
  await page.getByRole("link", { name: "Create course" }).click();
  await page.getByPlaceholder("Course name").fill(courseName);
  await page
    .getByPlaceholder("Course description")
    .fill(`Course ${random} description`);
  await page.getByPlaceholder("Course price").fill("100");

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page
    .getByText("Choose files or drag and dropImage (16MB)Choose File")
    .click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname, "mocked-image.jpg"));
  await page.getByRole("button", { name: "Upload 1 file" }).click();
  await expect(page.getByText("Delete image")).toBeVisible(longWait);

  await page.getByLabel("Category").click();
  await page.getByLabel(categoryName).getByText(categoryName).click();
  await page.locator('[data-test="creator-courses-create-button"]').click();
  await expect(page.getByText(`Course name: ${courseName}`)).toBeVisible(longWait);

  await page.locator('[data-test="create-chapter-button"]').click();
  page.once("dialog", (dialog) => {
    dialog.dismiss().catch(() => {});
  });

  await page.locator('[data-test="edit-chapter-button"]').click();
  await page.locator('[data-test="create-sub-chapter-button"]').click();
  await page
    .locator('[data-test="creator-course-chapters-dnd-list-subchapter-edit"]')
    .first()
    .click();
  await page.getByPlaceholder("Sub Chapter name").click();
  await page.getByPlaceholder("Sub Chapter name").fill("SubChapter 1");
  await page.locator('[data-test="creator-subchapter-edit-button"]').click();

  const fileChooserPromiseMovie = page.waitForEvent("filechooser");
  await page.getByText("Choose File").click();
  const fileChooserMovie = await fileChooserPromiseMovie;
  await fileChooserMovie.setFiles(path.join(__dirname, "mocked-movie.mp4"));
  await expect(page.getByText("Video added to course")).toBeVisible(longWait);

  await page.getByRole("link", { name: "Back to course" }).click();
  await page.getByRole("link", { name: "Watch course" }).click();
  await page.getByLabel(categoryName).click();
});
