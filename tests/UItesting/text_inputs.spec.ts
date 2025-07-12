import { test, expect, Locator } from '@playwright/test';

let textinput: Locator;
let updatingBtn: Locator;

let newName: string = 'NewButtonName';

test.beforeEach(async({page}) => {
    await page.goto('/textinput');
    textinput = page.getByTestId('newButtonName');
    updatingBtn = page.getByTestId('updatingButton');
})

test('Text input the easy way', async ({ page }) => {
    await textinput.fill(newName);
    await expect(textinput).toHaveValue(newName);

    let buttonText = await updatingBtn.textContent();
    await updatingBtn.click();
    if(buttonText !== null) await expect(updatingBtn).not.toHaveText(buttonText);
    await expect(updatingBtn).toHaveText(newName);
})

test('Text input manually', async ({ page }) => {
    // await textinput.fill('NewButtonName');
    await textinput.click();
    await page.keyboard.type('NewButSlow', { delay: 100 });

    
    await updatingBtn.click();
    await expect(updatingBtn).toHaveText('NewButSlow')
})