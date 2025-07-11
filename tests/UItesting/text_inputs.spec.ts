import { test, expect } from '@playwright/test';

test('Text input manually', async ({ page }) => {
    await page.goto('/textinput');
    let textinput = page.getByTestId('newButtonName');
    // await textinput.fill('NewButtonName');
    await textinput.click();
    await page.keyboard.type('NewButSlow', { delay: 100 });

    let updatingBtn = page.getByTestId('updatingButton');
    await updatingBtn.click();
    await expect(updatingBtn).toHaveText('NewButSlow')
})