import { expect, test } from "@playwright/test";

const textToSearch: string = "Welcome";

test("Playwright locates like this", async ({ page }) => {
  await page.goto("/verifytext");

  const welcomeText = page.getByText("Welcome UserName!", { exact: true });
  await expect(welcomeText).toContainText(textToSearch);
});

test("Or you can do it by steps", async ({ page }) => {
  await page.goto("/verifytext");

  const welcomeText = page.locator(".bg-primary").getByText(textToSearch);
  await expect(welcomeText).toContainText(textToSearch);
});

test("Or just old xPath", async ({ page }) => {
  await page.goto("/verifytext");

  // const welcomeText = page.locator("//span[normalize-space(.)='Welcome UserName!']");
  const welcomeText = page.locator(
    `//div[@class='bg-primary']//span[contains(normalize-space(.), '${textToSearch}')]`
  );
  await expect(welcomeText).toContainText(textToSearch);
});
