import { test, expect } from "@playwright/test";
import { timeoutConfig } from "../../playwright.config";

const cssProperty = "box-shadow";
const cssValue = "rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px";

test.beforeEach(async ({ page }) => {
  await page.goto("/nbsp");
});

test("Playwright handles non-breaking spaces easily", async ({ page }) => {
  const myButton = page.getByRole("button", { name: "My Button" });
  await myButton.click();
  await expect(myButton).toHaveCSS(cssProperty, cssValue);
});

test("Works with different locator", async ({ page }) => {
  const myButton = page.getByText("My button").last();
  await myButton.click();
  await expect(myButton).toHaveCSS(cssProperty, cssValue);
});

test.fail("If talking about xPath it gets harder", async ({ page }) => {
  const myButton = page.locator("//button[text()='My Button']");
  await myButton.click({ timeout: timeoutConfig.shortTimeout });
  await expect(myButton).toHaveCSS(cssProperty, cssValue);
});

test("We need to normalize space", async ({ page }) => {
  const myButton = page.locator(
    "//button[normalize-space(text()) = 'My Button']"
  );
  await myButton.click();
  await expect(myButton).toHaveCSS(cssProperty, cssValue);
});

test("Also we can use Unicode", async ({ page }) => {
  const myButton = page.locator("//button[text() = 'My\u00A0Button']");
  await myButton.click();
  await expect(myButton).toHaveCSS(cssProperty, cssValue);
});