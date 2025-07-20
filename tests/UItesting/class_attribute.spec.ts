import { test, expect, Locator } from "@playwright/test";

const attributeName = "box-shadow";
const attributeValue = "rgba(0, 123, 255, 0.5) 0px 0px 0px 3.2px"

test("Click the primary button", async({page})=>{
    await page.goto("/classattr");
    
    let primaryBtn!: Locator;
    const buttons = await page.getByRole("button").all();

    for(const element of buttons){
        const classValue = await element.getAttribute('class');
        if(classValue?.includes("btn-primary")){
            primaryBtn = element;
        }
    }

    await primaryBtn.click();
    await expect(primaryBtn).toHaveCSS(attributeName, attributeValue);
})

test("Get by CSS", async({page})=>{
    await page.goto("/classattr");
    
    const primaryBtn = page.locator(".btn-primary")

    await primaryBtn.click();
    await expect(primaryBtn).toHaveCSS(attributeName, attributeValue);
})

test("Get by xPath", async({page})=>{
    await page.goto("/classattr");
    
    const primaryBtn = page.locator("//button[contains(@class, 'btn-primary')]")

    await primaryBtn.click();
    await expect(primaryBtn).toHaveCSS(attributeName, attributeValue);
})