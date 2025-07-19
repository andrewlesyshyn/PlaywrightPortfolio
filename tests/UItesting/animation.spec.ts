/* eslint-disable playwright/expect-expect */
import { test, expect, Locator } from "@playwright/test";
import { timeoutConfig } from "../../playwright.config";

let startBtn: Locator;
let movingBtn: Locator;
let animationStatus: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto("/animation");

  startBtn = page.getByTestId("animationButton");
  movingBtn = page.getByTestId("movingTarget");
  animationStatus = page.getByTestId("opstatus");

  await startBtn.click();
  await expect(animationStatus).toHaveText("Animating the button...");
});

test("Animation test (default)", async () => {
  await movingBtn.click();
});

test("Waiting for class attribute to disappear", async () => {
  await expect(movingBtn).not.toContainClass("spin", { timeout: timeoutConfig.longTimeout });
  await movingBtn.click();
});

test("Waiting for state 'stable' (through ElementHandle)", async ({ page }) => {
  // eslint-disable-next-line playwright/no-element-handle
  const movingBtnHandle = await page.$("#movingTarget");
  if (movingBtnHandle === null)
    throw new Error("Moving Target element handle is not found");
  await movingBtnHandle.waitForElementState("stable");

  await movingBtnHandle.click();
});

test("Waiting for finished animations (getAnimations)", async ({ page }) => {
  await page.waitForFunction(() => {
    const el = document.querySelector("#movingTarget");
    if (el === null)
      throw new Error("Moving Target element handle is not found");

    const animations = el.getAnimations();
    return animations.every((anim) => anim.playState === "finished");
  });

  await movingBtn.click();
});

test.afterEach(async () => {
  await expect(movingBtn).not.toContainClass("spin");
  await expect(animationStatus).toContainText("Moving Target clicked.");
  await expect(animationStatus).not.toContainText("spin");
});
