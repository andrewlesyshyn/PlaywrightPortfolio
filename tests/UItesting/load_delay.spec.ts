import { test, expect, Locator } from "@playwright/test";

let loadDelayLink: Locator;
let afterDealyBtn: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto("/home");

  loadDelayLink = page.getByRole("link", { name: "Load Delay" });
  afterDealyBtn = page.getByRole("button", {
    name: "Button Appearing After Delay",
  });
});

test("Wait for URL", async ({ page }) => {
  await loadDelayLink.hover();
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForURL("/loaddelay");
  await expect(afterDealyBtn).toBeVisible();
});

test("Wait for domcontentloaded event", async ({ page }) => {
  await loadDelayLink.hover();
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForEvent("domcontentloaded");
  await expect(afterDealyBtn).toBeVisible();
});

test("Wait for load event", async ({ page }) => {
  await loadDelayLink.hover();
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForEvent("load");
  await expect(afterDealyBtn).toBeVisible();
});

test("Animation is tied to the click", async () => {
  await loadDelayLink.click();
  await expect(afterDealyBtn).toBeVisible();
});
