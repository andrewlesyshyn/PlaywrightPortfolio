import { test, expect, Locator } from '@playwright/test';

let badBtn: Locator;

test.beforeEach(async ({ page }) => {
    await page.goto("/click");

    badBtn = page.getByTestId('badButton');
    await expect(badBtn).toHaveCSS('background-color', 'rgb(0, 123, 255)');
})

test('Try to emulate', async ({}) => {
    await badBtn.dispatchEvent('click');

    await expect(badBtn).not.toHaveCSS('background-color', 'rgb(33, 136, 56)')
})

test('Click for real (thanks CDP)', async ({}) => {
    await badBtn.click();
    // const finalColor = await badBtn.evaluate((el) => {
    //     return getComputedStyle(el).backgroundColor;
    // });
    // console.log(finalColor);
    await expect(badBtn).toHaveCSS('background-color', 'rgb(33, 136, 56)')
})

test('Click semi-manually', async ({page}) => {
    await badBtn.hover();
    await expect(badBtn).toHaveCSS('background-color', 'rgb(0, 105, 217)')
    await page.click('#badButton', {position: {x: 10, y: 10}, clickCount: 5}); // don't ask
    await expect(badBtn).toHaveCSS('background-color', 'rgb(33, 136, 56)')
})

test('Click manually', async ({page}) => {
    let box = await badBtn.boundingBox();
    console.log(box);
    if(box !== null){
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.up();
        // Or just use this code
        // await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await expect(badBtn).toHaveCSS('background-color', 'rgb(33, 136, 56)')
    }
})

