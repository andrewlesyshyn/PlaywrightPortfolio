import { test, expect } from "@playwright/test";

// Remember that dialogs are auto DISMISSED by the Playwright
// https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs

test("Work with Alert", async ({ page }) => {
  await page.goto("/alerts");

  const alertMsg = "Today is a working day.\nOr less likely a holiday.";

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toBe(alertMsg);
    dialog.accept();
  });

  const alertBtn = page.getByTestId("alertButton");
  await alertBtn.click();
});

test("Work with confirm", async ({ page }) => {
  await page.goto("/alerts");

  const confirmMsg = "Today is Friday.\nDo you agree?";
  const confirmBtn = page.getByTestId("confirmButton");

  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(confirmMsg);
    dialog.dismiss();
  });
  await confirmBtn.click();

  page.once("dialog", (dialog) => {
    expect(dialog.message()).toBe(confirmMsg);
    dialog.accept();
  });
  await confirmBtn.click();
});

test("Work with prompt", async ({ page }) => {
  await page.goto("/alerts");

  const promptBtn = page.getByTestId("promptButton");

  const expectedDialogs = [
    {
      message: "Choose \"cats\" or 'dogs'.\nEnter your value:",
      action: "dismiss",
    },
    { message: "User value: no answer", action: "accept" },
    {
      message: "Choose \"cats\" or 'dogs'.\nEnter your value:",
      action: "accept",
      promptText: "rats",
    },
    { message: "User value: rats", action: "accept" },
  ];

  let index = 0;

  page.on("dialog", async (dialog) => {
    const current = expectedDialogs[index++];
    expect(dialog.message()).toBe(current.message);
    // await page.waitForTimeout(2_000)

    if (dialog.type() === "prompt") {
      if (current.action === "accept") {
        await dialog.accept(current.promptText);
      } else {
        await dialog.dismiss();
      }
    } else {
      await dialog.accept();
    }
  });

  await promptBtn.click();
  await page.waitForEvent("dialog");

  await promptBtn.click();
  await page.waitForEvent("dialog"); // sometimes event handling could be not resolvedin time

  await expect(promptBtn).toBeVisible(); // if is there is no action after it
});
