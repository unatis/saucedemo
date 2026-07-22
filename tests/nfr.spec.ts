import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeAll(async () => {
    console.log("Start NFR Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto('/');
});

test.afterAll(async ({ }) => {
    console.log("End NFR Suite");
});

// TC-24 (NFR-1)
test("TC-24 Key elements have stable data-test attributes", async () => {

    await loginPage.verify_Login_Page();

    await loginPage.verify_DataTest_Attributes();

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.verify_DataTest_Attributes();
});

// TC-25 (NFR-4)
test("TC-25 Site is served over HTTPS only", async ({ page }) => {

    await page.goto('http://www.saucedemo.com/');

    expect(page.url()).toContain('https://');

    await loginPage.verify_Login_Page();
});

// TC-26 (NFR-5)
// Cross-browser smoke is covered by playwright.config.ts projects:
// enable the commented "firefox" (Desktop Firefox), "webkit" (Desktop Safari) and "Microsoft Edge" projects
// in playwright.config.ts and run the checkout.spec.ts TC-14 happy path across all of them.
