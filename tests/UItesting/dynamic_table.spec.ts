import { test, expect, Locator } from '@playwright/test';

// cha cha cha changes
test('Try to handle the table', async({page}) => {
    await page.goto('/dynamictable');
    let processName: string = 'Chrome';
    let resourceName: string = 'CPU';

    let table = page.getByRole('table');
    let columnIndex: number = (await table.getByRole('columnheader').allInnerTexts()).indexOf(resourceName);

    let row: Locator = table.getByRole('row', {name: processName});
    let cell: Locator = row.getByRole('cell').nth(columnIndex);
    
    let utilization: string | null = await cell.textContent();
    if(utilization === null) throw new Error(`${processName} ${resourceName} utilization is not found`)
    await expect(page.getByRole('paragraph').filter({hasText: `${processName} ${resourceName}`})).toContainText(utilization);

})