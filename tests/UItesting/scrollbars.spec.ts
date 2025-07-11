import { test, expect } from '@playwright/test';

test('Text input manually', async ({ page }) => {
    await page.goto('/scrollbars');
    let overflowedContainer = page.locator("//h4[text()='Playground']/following-sibling::div");
    let hidingBtn = page.getByTestId('hidingButton');

    // await expect(hidingBtn).toBeHidden(); // In this case, element has property 'hidden: false' so it is visible, but overflown by another element
    await expect(hidingBtn).not.toBeInViewport(); // So it could be useful to use viewport assertion
    // await hidingBtn.scrollIntoViewIfNeeded();
    await hidingBtn.click();
    await expect(hidingBtn).toHaveCSS('box-shadow', 'rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px')

    // box-shadow:
    //rgba(0, 123, 255, .5);
})