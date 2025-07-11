import { test, expect } from '@playwright/test';

test('Click for real and emulate', async ({ page }) => {
    await page.goto("/click");

    let badBtn = page.getByTestId('badButton');
    //add try catch for this check or separate test
    // await badBtn.dispatchEvent('click');
    await badBtn.click();
    const finalColor = await badBtn.evaluate((el) => {
        return getComputedStyle(el).backgroundColor;
    });
    console.log(finalColor);
    await expect(badBtn).toHaveCSS('background-color', 'rgb(33, 136, 56)')
})