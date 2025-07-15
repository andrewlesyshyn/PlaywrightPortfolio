import { test, expect, Locator } from "@playwright/test";

let hideBtn: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto("/visibility");
  hideBtn = page.getByTestId("hideButton");
});

/*
(https://playwright.dev/docs/actionability#visible)
    Element is considered visible when it has non-empty bounding box and does not have visibility:hidden computed style.
    Elements of zero size are NOT considered visible.
    Elements with display:none are NOT considered visible.
    Elements with opacity:0 are considered visible.
*/

test.describe("Cases that work with toBeHidden/toBeVisible()", () => {
  const buttonIDs = [
    "removedButton",
    "zeroWidthButton",
    "invisibleButton",
    "notdisplayedButton",
  ];

  for (const btnId of buttonIDs) {
    test(`Sanity check of visibility of ${btnId} button`, async ({ page }) => {
      const notVisibleBtn = page.getByTestId(btnId);
      await expect(notVisibleBtn).toBeVisible();
      await hideBtn.click();

      await expect(notVisibleBtn).toBeHidden();
    });
  }
});

test.describe("Edge cases that dont work with toBeHidden/toBeVisible()", () => {
  test("Overlapped", async ({ page }) => {
    const overlappedBtn = page.getByTestId("overlappedButton");
    await expect(overlappedBtn).toBeVisible();
    await hideBtn.click();

    const isOverlapped = await overlappedBtn.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      const elementAtCenter = document.elementFromPoint(centerX, centerY); //returns the topmost Element at the specified coordinates (relative to the viewport).
      return elementAtCenter !== el && !el.contains(elementAtCenter);
    });
    expect(isOverlapped).toBe(true);
  });

  test("Transparent", async ({ page }) => {
    const transparentBtn = page.getByTestId("transparentButton");
    await expect(transparentBtn).toBeVisible();
    await hideBtn.click();

    await expect(transparentBtn).toHaveCSS("opacity", "0");
  });

  test("Off screen", async ({ page }) => {
    const offscreenBtn = page.getByTestId("offscreenButton");
    await expect(offscreenBtn).toBeVisible();
    await hideBtn.click();

    await expect(offscreenBtn).not.toBeInViewport();
  });
});
