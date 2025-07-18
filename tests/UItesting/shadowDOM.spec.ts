import { expect, test } from "@playwright/test";

// https://playwright.dev/docs/locators#locate-in-shadow-dom
test("Shadow DOM with Playwright locators is built-in", async ({ page }) => {
  await page.goto("/shadowdom");
  const cogBtn = page.getByTestId("buttonGenerate");
  //   const copyBtn = page.getByTestId("buttonCopy");
  const guuidField = page.getByTestId("editField");

  await cogBtn.click();
  //   await copyBtn.click();

  // You can't access navigator.clipboard if site is not HTTPS

  const displayedUUID = await guuidField.inputValue();
  await guuidField.clear();
  await guuidField.fill(displayedUUID);
  await expect(guuidField).toHaveValue(displayedUUID);
});

test("Also you can get to the shadow DOM with selector", async ({ page }) => {
  await page.goto("/shadowdom");
  const cogBtn = page.locator("#buttonGenerate");
  const guuidField = page.locator("#editField");

  await cogBtn.click();

  const displayedUUID = await guuidField.inputValue();
  await guuidField.clear();
  await guuidField.fill(displayedUUID);
  await expect(guuidField).toHaveValue(displayedUUID);
});

