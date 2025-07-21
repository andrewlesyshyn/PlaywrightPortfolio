import { test, expect, Locator, Request, Response } from "@playwright/test";

let ajaxBtn: Locator;
let ajaxDataDiv: Locator;
const responseTextStr = "Data loaded with AJAX get request.";
const requestURLsubstr = "/ajaxdata";

test.beforeEach(async ({ page }) => {
  await page.goto("/ajax");

  ajaxBtn = page.getByTestId("ajaxButton");
  ajaxDataDiv = page.getByTestId("content");
});

test("Wait for the response function", async ({ page }) => {
  await ajaxBtn.click();
  const response = await page.waitForResponse(
    (response) =>
      response.url().includes("/ajaxdata") && response.status() === 200
  );

  const responseText = await response.text();
  await expect(ajaxDataDiv).toHaveText(responseText);
});

test("Wait for the event", async ({ page }) => {
  await ajaxBtn.click();

  const response = await page.waitForEvent(
    "response",
    (response) =>
      response.url().includes("/ajaxdata") && response.status() === 200
  );
  const responseText = await response.text();
  await expect(ajaxDataDiv).toHaveText(responseText);
});

test("Event listener", async ({ page }) => {

  let targetRequest: Request;
  let targetResponse: Response;

  const responsePromise = new Promise<Response>(
    (resolve) => {
      page.on("response", async (response) => {
        if (
          response.url().includes(requestURLsubstr) &&
          response.status() === 200
        ) {
          targetResponse = response;
          resolve(response);
        }
      });
    }
  );

  page.on("request", (request) => {
    if (request.url().includes(requestURLsubstr)) {
      targetRequest = request;
    }
  });

  await ajaxBtn.click();

  const response = await responsePromise;
  const responseText = await response.text();

  await expect(ajaxDataDiv).toHaveText(responseText);
});

test("AJAX route wait", async ({ page }) => {
  let request = await page.route("**/ajaxdata", async (route) => {
    const response = await route.fetch();
    let text = await response.text();
    console.log(text);
    text = JSON.stringify("I changed the response");
    await route.fulfill({ response, json: text });
  });

  await ajaxBtn.click();

  await expect(ajaxDataDiv).toHaveText('"I changed the response"', {
    timeout: 35_000,
  });
});