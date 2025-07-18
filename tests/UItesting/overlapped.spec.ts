import { test, expect, type Locator } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";

let idInput: Locator;
let nameInput: Locator;
const idValue = "someID";
const nameValue = "someName";

test.beforeEach(async ({ page }) => {
  await page.goto("/overlapped");

  idInput = page.getByTestId("id");
  nameInput = page.getByTestId("name");

  await idInput.fill(idValue);
  await expect(idInput).toHaveValue(idValue);
});

test.fail("Overlapped elements", async () => {
  await nameInput.scrollIntoViewIfNeeded();
  await expect(nameInput).toBeInViewport();
  await nameInput.fill(nameValue);
  await expect(
    nameInput,
    "Name input does not have provided value"
  ).toHaveValue(nameValue);
});

test("Overlapped input", async () => {
  await nameInput.evaluate((e) => e.scrollIntoView()); // this works because by default scrollIntoView alignToTop = true
  await nameInput.fill(nameValue);
  await expect(
    nameInput,
    "Name input does not have provided value"
  ).toHaveValue(nameValue);
});

test("Overlapped input by overlap", async ({ page }) => {
  const base = new BasePage(page);
  const isElemOverlapped = await base.isElementOverlapped(nameInput);
  if (isElemOverlapped) {
    await nameInput.evaluate((el) => {
      el.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "start",
      });
    });
  }
  await nameInput.fill(nameValue);
  await expect(
    nameInput,
    "Name input does not have provided value"
  ).toHaveValue(nameValue);
});
