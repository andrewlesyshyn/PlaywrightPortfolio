import { test, expect } from "@playwright/test";

let firstBtn, firstClickCount, secondBtn, secondClickCount;

test.beforeEach(async ({ page }) => {
  await page.goto("/mouseover");
  firstBtn = page.getByTitle("Click me"); // should be by case definition
  firstClickCount = page.getByTestId("clickCount");
  secondBtn = page.getByTitle("Link Button");
  secondClickCount = page.getByTestId("clickButtonCount");

  await expect(firstClickCount).toHaveText("0");
  await expect(secondClickCount).toHaveText("0");
});

test.fail("Try to click first button as usual, and fail", async () => {
  await firstBtn.click({ timeout: 2_000 });
  await expect(firstClickCount).toHaveText("1");
});

test.fail("Try to click second button as usual, and fail", async ({ page }) => {
  const secondElement = await page.$(
    "body > section > div > div:nth-child(9) > a"
  ); // if we will use Locator object, in this case click() will work
  if (secondElement === null)
    throw new Error("Element Handle is not found for 'secondElement'");

  await secondElement.click({ timeout: 2_000 });
  await expect(secondClickCount).toHaveText("1");
});

test("Try to mouseover", async ({ page }) => {
  await firstBtn.hover();
  await page.mouse.down();
  await page.mouse.up();
  await expect(firstClickCount).toHaveText("1");

  await secondBtn.hover();
  await page.mouse.down();
  await page.mouse.up();
  await expect(secondClickCount).toHaveText("1");
});

test.fail("Also you can try to dispatch event", async () => {
  await firstBtn.hover();
  await firstBtn.dispatchEvent("click", null, {timeout: 2_000});
  await expect(firstClickCount).toHaveText("1");
})

test("Or just dispatch event ;)", async () => {
  await secondBtn.hover();
  await secondBtn.dispatchEvent("click");
  await expect(secondClickCount).toHaveText("1");
});
