import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { CartPage } from '../pages/cart.page';
import { Checkout_Stepone_Page } from '../pages/checkout_stepone.page';
import { Checkout_Steptwo_Page } from '../pages/checkout_steptwo.page';
import { Checkout_Complite_Page } from '../pages/checkout_complite.page';
import { BurgerMenuPage } from '../pages/Header/burgerMenu.page';
import { BurgerMenuItems } from "../enums/headerEnum";

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let cartPage: CartPage;
let checkoutPage: Checkout_Stepone_Page;
let checkoutPage2: Checkout_Steptwo_Page;
let checkout_Complite_Page: Checkout_Complite_Page;
let burgerMenuPage: BurgerMenuPage;

test.beforeAll(async () => {
    console.log("Start E2E Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new Checkout_Stepone_Page(page);
    checkoutPage2 = new Checkout_Steptwo_Page(page);
    checkout_Complite_Page = new Checkout_Complite_Page(page);
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto('/');
});

test.afterEach(async ({ }) => {


});

test.afterAll(async ({ }) => {
    console.log("End E2E Suite");

});

test("First E2E test", async () => {

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");

    await headerPage.click_GoToCart_Button();

    await cartPage.verify_CartItem("Sauce Labs Backpack");
    await cartPage.click_Checkout_Button();

    await checkoutPage.set_FirstName_TextBox("Jack");
    await checkoutPage.set_SecondName_TextBox("Sparrow");
    await checkoutPage.set_PostalCode_TextBox("Tortuga");
    await checkoutPage.click_Continue_Button();

    await checkoutPage2.verify_CartItem("Sauce Labs Backpack");

    await checkoutPage2.verify_PaymentInformation_Label();

    await checkoutPage2.verify_PriceTotal_Label();

    await checkoutPage2.click_Finish_Button();

    await checkout_Complite_Page.verify_PonyExpress_Image();

    await checkout_Complite_Page.verify_ThankYou_Label();

    await checkout_Complite_Page.click_BackHome_Button();

    await inventoryPage.verify_Inventory_Page();

    await headerPage.click_Burger_Menu();

    await burgerMenuPage.verify_BurgerMenu_PopUp();

    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.LOGOUT);

    await loginPage.verify_Login_Page();
});