import { test, expect } from "@playwright/test";
import { timeoutConfig } from "../../playwright.config";

test.fail("Hidden Layers", async({page})=>{
    await page.goto("/hiddenlayers")

    const greenBtn = page.getByTestId('greenButton');
    const blueBtn = page.getByTestId('blueButton');

    await expect(blueBtn).toBeHidden();
    await greenBtn.click();
    await expect(blueBtn).toBeVisible();
    await greenBtn.click({timeout: timeoutConfig.shortTimeout});
})