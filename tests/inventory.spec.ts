import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { SortOptions } from '../enums/inventoryEnum';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;

test.beforeAll(async () => {
    console.log("Start Inventory Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Inventory Suite");
});

// TC-08 (FR-2.1, FR-2.3)
test("TC-08 Inventory catalog contains 6 items with correct names and prices", async () => {

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.verify_InventoryItems_Count(6);

    await inventoryPage.verify_InventoryItem_Price("Sauce Labs Backpack", "$29.99");
    await inventoryPage.verify_InventoryItem_Price("Sauce Labs Bike Light", "$9.99");
    await inventoryPage.verify_InventoryItem_Price("Sauce Labs Bolt T-Shirt", "$15.99");
    await inventoryPage.verify_InventoryItem_Price("Sauce Labs Fleece Jacket", "$49.99");
    await inventoryPage.verify_InventoryItem_Price("Sauce Labs Onesie", "$7.99");
    await inventoryPage.verify_InventoryItem_Price("Test.allTheThings() T-Shirt (Red)", "$15.99");

    await headerPage.verify_Logo_Label();

    await headerPage.verify_Burger_Button();

    await headerPage.verify_GoToCart_Button();
});

// TC-09 (FR-2.2)
test("TC-09 Inventory sorting modes reorder items", async () => {

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.verify_Sort_ComboBox_Selected(SortOptions.NAME_A_TO_Z);

    await inventoryPage.verify_FirstInventoryItem_Name("Sauce Labs Backpack");

    await inventoryPage.select_Sort_ComboBox(SortOptions.NAME_Z_TO_A);
    await inventoryPage.verify_FirstInventoryItem_Name("Test.allTheThings() T-Shirt (Red)");

    await inventoryPage.select_Sort_ComboBox(SortOptions.PRICE_LOW_TO_HIGH);
    await inventoryPage.verify_FirstInventoryItem_Name("Sauce Labs Onesie");

    await inventoryPage.select_Sort_ComboBox(SortOptions.PRICE_HIGH_TO_LOW);
    await inventoryPage.verify_FirstInventoryItem_Name("Sauce Labs Fleece Jacket");
});
