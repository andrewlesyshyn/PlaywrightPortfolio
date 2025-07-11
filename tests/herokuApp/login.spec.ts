import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    console.log(dialog.type());
    // await dialog.dismiss();
  })
  await page.getByRole('link', { name: 'Basic Auth' }).click();

//   await page.goto('https://the-internet.herokuapp.com/basic_auth');
//   await page.getByRole('heading', { name: 'Basic Auth' }).click();
//   await page.getByText('Congratulations! You must').click();
});