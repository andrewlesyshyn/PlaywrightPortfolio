import { test, expect } from "@playwright/test";

test("AJAX request wait", async ({ page }) => {
  await page.goto("/ajax");

  const ajaxBtn = page.getByTestId("ajaxButton");
  const ajaxDataDiv = page.getByText("Data loaded with AJAX get");

  // page.on('requestfinished', async(data) => {
  //     console.log(await data.response())
  //     console.log(data.url())
  //     console.log(data.postData())
  // });
  await ajaxBtn.click();
  const response = await page.waitForResponse(
    (response) =>
      response.url().includes("/ajaxdata") && response.status() === 200
  );

  const responseBody = await response.text();
  console.log(responseBody);
});
