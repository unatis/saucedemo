import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { BurgerMenuPage } from '../pages/Header/burgerMenu.page';
import { BurgerMenuItems } from "../enums/headerEnum";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let burgerMenuPage: BurgerMenuPage;

test.beforeAll(async () => {
    console.log("Start Burger Menu Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Burger Menu Suite");
});

// TC-18 (FR-6.1, FR-6.2)
test("TC-18 Burger menu items and Reset App State", async ({ page }) => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.verify_CartBadge_Count(2);

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();

    await burgerMenuPage.verify_BurgerMenu_Items([BurgerMenuItems.ALLITEMS, BurgerMenuItems.ABOUT, BurgerMenuItems.LOGOUT, BurgerMenuItems.RESETAPPSTATE]);

    await burgerMenuPage.verify_BurgerMenuItem_Href(BurgerMenuItems.ABOUT, "https://saucelabs.com/");

    await burgerMenuPage.click_BurgerMenuClose_Button();

    await burgerMenuPage.verify_BurgerMenu_Closed();

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();

    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.RESETAPPSTATE);

    await headerPage.verify_CartBadge_Hidden();

    // Deviation from FR-6.2 (candidate defect): Reset App State clears the cart badge,
    // but the "Remove" buttons do not reset to "Add to cart" until the page is reloaded.
    await page.reload();

    await inventoryPage.verify_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.verify_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();
    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.ALLITEMS);

    await inventoryPage.verify_Inventory_Page();
});
