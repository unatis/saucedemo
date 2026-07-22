import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { CartPage } from '../pages/cart.page';
import { BurgerMenuPage } from '../pages/Header/burgerMenu.page';
import { BurgerMenuItems } from "../enums/headerEnum";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let cartPage: CartPage;
let burgerMenuPage: BurgerMenuPage;

test.beforeAll(async () => {
    console.log("Start Cart Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Cart Suite");
});

// TC-11 (FR-4.1, FR-4.2)
test("TC-11 Add and remove items updates buttons and cart badge", async () => {

    await inventoryPage.verify_Inventory_Page();

    await headerPage.verify_CartBadge_Hidden();

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");

    await inventoryPage.verify_Remove_Button("Sauce Labs Backpack");

    await headerPage.verify_CartBadge_Count(1);

    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.verify_CartBadge_Count(2);

    await inventoryPage.click_Remove_Button("Sauce Labs Backpack");

    await inventoryPage.verify_AddToCart_Button("Sauce Labs Backpack");

    await headerPage.verify_CartBadge_Count(1);

    await inventoryPage.click_Remove_Button("Sauce Labs Bike Light");

    await headerPage.verify_CartBadge_Hidden();
});

// TC-12 (FR-4.4)
test("TC-12 Cart page shows items and allows remove and continue shopping", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.click_GoToCart_Button();

    await cartPage.verify_Cart_Page();

    await cartPage.verify_CartItem("Sauce Labs Backpack");
    await cartPage.verify_CartItem("Sauce Labs Bike Light");

    await cartPage.verify_CartItem_Qty("Sauce Labs Backpack", 1);

    await cartPage.verify_CartItem_Price("Sauce Labs Backpack", "$29.99");

    await cartPage.click_Remove_Button("Sauce Labs Bike Light");

    await cartPage.verify_CartItem_Removed("Sauce Labs Bike Light");

    await headerPage.verify_CartBadge_Count(1);

    await cartPage.click_ContinueShopping_Button();

    await inventoryPage.verify_Inventory_Page();
    await headerPage.verify_CartBadge_Count(1);
});

// TC-13 (FR-4.3, NFR-3)
test("TC-13 Cart persists across navigation and logout/login", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.verify_CartBadge_Count(2);

    await headerPage.click_GoToCart_Button();
    await cartPage.verify_CartItem("Sauce Labs Backpack");
    await cartPage.verify_CartItem("Sauce Labs Bike Light");

    await cartPage.click_ContinueShopping_Button();
    await headerPage.verify_CartBadge_Count(2);

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();
    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.LOGOUT);

    await loginPage.verify_Login_Page();

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    await headerPage.verify_CartBadge_Count(2);

    await headerPage.click_GoToCart_Button();
    await cartPage.verify_CartItem("Sauce Labs Backpack");
    await cartPage.verify_CartItem("Sauce Labs Bike Light");
});
