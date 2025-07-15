import { test, expect, Locator } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
if (process.env.UI_USER_NAME === undefined)
  throw new Error("USER_NAME env variable is not defined");
if (process.env.UI_USER_PWD === undefined)
  throw new Error("USER_PWD env variable is not defined");

const userName = process.env.UI_USER_NAME;
const userPassword = process.env.UI_USER_PWD;

let loginStatus: Locator;
let userNameInput: Locator;
let passwordInput: Locator;
let loginBtn: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto("/sampleapp");
  loginStatus = page.getByTestId("loginstatus");
  userNameInput = page.getByPlaceholder("User Name");
  passwordInput = page.getByPlaceholder("********");
  loginBtn = page.getByTestId("login");

  await expect(loginStatus).toHaveText("User logged out.");
});

test("Sample app test", async () => {
  await userNameInput.fill(userName);
  await passwordInput.fill(userPassword);
  await loginBtn.click();
  await expect(loginStatus).toHaveText(`Welcome, ${userName}!`);
});

test("Wrong password", async () => {
  await userNameInput.fill(userName);
  await passwordInput.fill(userPassword + "1");
  await loginBtn.click();
  await expect(loginStatus).toHaveText("Invalid username/password");
});

test("Empty user name", async () => {
  await userNameInput.fill("");
  await passwordInput.fill(userPassword);
  await loginBtn.click();
  await expect(loginStatus).toHaveText("Invalid username/password");
});

// Why like this? Just to use testInfo :)
test.afterEach(async({}, testInfo)=>{
    if(testInfo.title === "Sample app test" && testInfo.status === "passed"){
        await loginBtn.click();
        await expect(loginStatus).toHaveText("User logged out.");
    }
})
