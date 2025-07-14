import { test, expect, Locator } from '@playwright/test';

let textinput: Locator;
let updatingBtn: Locator;

let newName: string = 'NewButtonName';

test.beforeEach(async({page}) => {
    await page.goto('/textinput');
    textinput = page.getByTestId('newButtonName');
    updatingBtn = page.getByTestId('updatingButton');
})

test('Text input the easy way', async () => {
    await textinput.fill(newName);
    await expect(textinput).toHaveValue(newName);

    const buttonText = await updatingBtn.textContent();
    await updatingBtn.click();
    if(buttonText !== null) await expect(updatingBtn).not.toHaveText(buttonText);
    await expect(updatingBtn).toHaveText(newName);
})

test('Text input manually', async ({ page }) => {
    newName = newName + "ButSlow";
    await textinput.click();
    await page.keyboard.type(newName, { delay: 100 });
    
    
    await updatingBtn.click();
    await expect(updatingBtn).toHaveText(newName)
})

test('Text input, but really manually', async ({ page }) => {
    newName = newName + " But Silly";
    await textinput.click();

    for(const char of newName.split('')){
        await page.keyboard.press(char, {delay: 50})
    }
    
    await updatingBtn.click();
    await expect(updatingBtn).toHaveText(newName)
})