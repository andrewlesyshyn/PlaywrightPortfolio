import { test, expect, Locator } from '@playwright/test';

let overflowedContainer: Locator;
let hidingBtn: Locator;

// turn and face the strange
test.beforeEach(async ({ page }) => {
    await page.goto('/scrollbars');
    overflowedContainer = page.locator("//h4[text()='Playground']/following-sibling::div");
    hidingBtn = page.getByTestId('hidingButton');
    // await expect(hidingBtn).toBeHidden(); // In this case, element has property 'hidden: false' so it is visible, but overflown by another element
    await expect(hidingBtn).not.toBeInViewport(); // So it could be useful to use viewport assertion
})

test('Just click, even if not in viewport', async () => {
    await hidingBtn.click();
    await expect(hidingBtn).toHaveCSS('box-shadow', 'rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px')
})

test('Hover and mouse down still working', async ({ page }) => {
    await hidingBtn.hover();
    await expect(hidingBtn).toBeInViewport();
    await page.mouse.down();
    await page.mouse.up();
    await expect(hidingBtn).toHaveCSS('box-shadow', 'rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px')
})

test('Try to move mouse over manually', async ({ page }) => {
    await hidingBtn.scrollIntoViewIfNeeded();
    await expect(hidingBtn).toBeInViewport();
    let box = await hidingBtn.boundingBox();
    if (box === null) throw new Error("Hiding button has no bounding box");
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await expect(hidingBtn).toHaveCSS('box-shadow', 'rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px')
})

test('Scroll into manually', async ({ page }) => {
    await overflowedContainer.click();
    let containerBox = await overflowedContainer.boundingBox();
    if (containerBox === null) throw new Error("Container has no bounding box");
    
    let box = await hidingBtn.boundingBox();
    if (box === null) throw new Error("Hiding button has no bounding box");

    await page.mouse.wheel(box.x - containerBox.x, box.y - containerBox.y)
    await expect(hidingBtn).toBeInViewport();
    
    await page.mouse.click(containerBox.x + box.width / 2, containerBox.y + box.height / 2);
    await expect(hidingBtn).toHaveCSS('box-shadow', 'rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px')
})