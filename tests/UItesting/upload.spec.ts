import { test, expect, Locator } from "@playwright/test";
import { readFileSync } from "fs";
import path from "path";

let uploadInput: Locator;
let fileInList: Locator;
const filePath = path.join(__dirname, "../../uploadFiles/my_apologies.pdf");

test.beforeEach(async ({ page }) => {
  await page.goto("/upload");
  uploadInput = page.locator("iframe").contentFrame().getByText("Browse files");
  fileInList = page
    .locator("iframe")
    .contentFrame()
    .getByText("my_apologies.pdf");
});

test("Upload by sending file", async () => {
  await uploadInput.setInputFiles(filePath);

  await expect(fileInList).toBeVisible();
});

test("Upload by waiting filechooser event", async ({ page }) => {
  const fileChooserPromise = page.waitForEvent("filechooser");
  await uploadInput.click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(filePath);

  await expect(fileInList).toBeVisible();
});

test("Upload by droppin it", async ({ page }) => {
  const frame = page.frame({ url: "/static/upload.html" });
  if (frame === null) throw new Error("Frame is not found");

  const buffer = readFileSync(
    filePath
  ).toString("base64");

  const dataTransfer = await frame.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], localFileName, { type: localFileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: "my_apologies.pdf",
      localFileType: "application/pdf",
    }
  );

  await frame.dispatchEvent(".browse-btn", "drop", { dataTransfer });
  await expect(fileInList).toBeVisible();
});
