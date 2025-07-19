import { test, expect } from "@playwright/test"

test("Click button with the dynamic id", async ({ page }) => {
  await page.goto("/dynamicid");
  const dynamicBtn = page.getByRole("button", {
    name: "Button with Dynamic ID",
  });
  await dynamicBtn.click();
  await expect(dynamicBtn).toHaveCSS(
    "box-shadow",
    "rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px"
  );
});
