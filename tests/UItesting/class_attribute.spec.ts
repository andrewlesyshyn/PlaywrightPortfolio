import { test, expect } from "@playwright/test";

test("Click the primary button", async({page})=>{
    await page.goto("/classattr");
     
    const buttons = await page.getByRole("button").all()
    for(const element of buttons){
        let classValue = await element.getAttribute('class');
        console.log(classValue);
    }

    // await expect(buttons[0]).tobeVisible();
})