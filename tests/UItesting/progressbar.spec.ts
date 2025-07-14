import { expect, test } from "@playwright/test";

let startBtn, stopBtn, progressbar, resultbar;

test.beforeEach(async ({ page }) => {
  await page.goto("/progressbar");

  startBtn = page.getByTestId("startButton");
  stopBtn = page.getByTestId("stopButton");
  progressbar = page.getByTestId("progressBar");
  resultbar = page.getByTestId("result");
});

test("Progressbars can mess with expects, so 'poll'", async () => {
  await startBtn.click();
  await expect
    .poll(
      async () => {
        const valueNow = await progressbar.getAttribute("aria-valuenow");
        // console.log(`${typeof valueNow}: ${valueNow}`);
        return valueNow;
      },
      {
        intervals: [50],
        timeout: 60_000,
      }
    )
    .toBe("75");
  await stopBtn.click();
  // await expect(resultbar).toContainText("Result: 0");
});

test("Also we can use 'toPass'", async () => {
  await startBtn.click();

  await expect(async () => {
    const valueNow = await progressbar.getAttribute("aria-valuenow");
    // console.log(`${typeof valueNow}: ${valueNow}`);
    expect(valueNow).toBe("75");
  }).toPass({
    intervals: [50],
    timeout: 60_000,
  });
  await stopBtn.click();
  // await expect(resultbar).toContainText("Result: 0");
});

test.afterEach(async () => {
  await expect(resultbar).toContainText("Result: 0");
});
