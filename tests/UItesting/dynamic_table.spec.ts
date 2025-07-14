import { test, expect, Locator } from "@playwright/test";

test("Try to handle the table", async ({ page }) => {
  await page.goto("/dynamictable");
  const processName: string = "Chrome";
  const resourceName: string = "CPU";

  const table = page.getByRole("table");
  const columnIndex: number = (
    await table.getByRole("columnheader").allInnerTexts()
  ).indexOf(resourceName);

  const row: Locator = table.getByRole("row", { name: processName });
  const cell: Locator = row.getByRole("cell").nth(columnIndex);

  const utilization: string | null = await cell.textContent();
  if (utilization === null)
    throw new Error(`${processName} ${resourceName} utilization is not found`);
  await expect(
    page
      .getByRole("paragraph")
      .filter({ hasText: `${processName} ${resourceName}` })
  ).toContainText(utilization);
});
