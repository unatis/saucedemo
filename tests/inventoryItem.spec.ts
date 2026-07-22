import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { Inventory_Item_Page } from '../pages/inventory_item.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let inventoryItemPage: Inventory_Item_Page;

test.beforeAll(async () => {
    console.log("Start Inventory Item Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    inventoryItemPage = new Inventory_Item_Page(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Inventory Item Suite");
});

// TC-10 (FR-3.1, FR-3.2, FR-3.3)
test("TC-10 Inventory item page opens from catalog and returns back", async () => {

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.click_ItemName_Link("Sauce Labs Backpack");

    await inventoryItemPage.verify_InventoryItem_Page("Sauce Labs Backpack");

    await inventoryItemPage.verify_InventoryItem_Price("$29.99");

    await inventoryItemPage.click_AddToCart_Button();

    await inventoryItemPage.verify_Remove_Button();

    await headerPage.verify_CartBadge_Count(1);

    await inventoryItemPage.click_BackToProducts_Button();

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.verify_Remove_Button("Sauce Labs Backpack");

    await inventoryPage.click_ItemImage_Link("Sauce Labs Bike Light");

    await inventoryItemPage.verify_InventoryItem_Page("Sauce Labs Bike Light");
});
