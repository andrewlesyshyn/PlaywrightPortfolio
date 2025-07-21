import { test, expect, Locator } from "@playwright/test"
import { timeoutConfig } from "../../playwright.config";

let enableBtn: Locator;
let inputField: Locator;
const inputText: string = '"Now this input is working"';

test.beforeEach(async({page})=>{
    await page.goto("/disabledinput");
    
    enableBtn = page.getByTestId('enableButton');
    inputField = page.getByTestId('inputField');
    
    await expect(inputField).toBeEnabled();
})

test("Fill with text after input is enabled", async()=> {
    await enableBtn.click();
    await expect(inputField).toBeDisabled();
    await inputField.fill(inputText);
    await expect(inputField).toHaveValue(inputText)
})

test.fail("Fill with text by force", async()=> {
    await enableBtn.click();
    await expect(inputField).toBeDisabled();
    // eslint-disable-next-line playwright/no-force-option
    await inputField.fill(inputText, {force: true});
    await expect(inputField).toHaveValue(inputText)
})

test("Wait for element to be enabled", async()=> {
    await enableBtn.click();
    await expect(inputField).toBeDisabled();
    await expect(inputField).toBeEnabled({timeout: timeoutConfig.longTimeout});
    await inputField.fill(inputText);
    await expect(inputField).toHaveValue(inputText)
})