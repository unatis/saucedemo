import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { HeaderPage } from '../pages/Header/header.page';
import { CartPage } from '../pages/cart.page';
import { Checkout_Stepone_Page } from '../pages/checkout_stepone.page';
import { Checkout_Steptwo_Page } from '../pages/checkout_steptwo.page';
import { Checkout_Complite_Page } from '../pages/checkout_complite.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let cartPage: CartPage;
let checkoutPage: Checkout_Stepone_Page;
let checkoutPage2: Checkout_Steptwo_Page;
let checkout_Complite_Page: Checkout_Complite_Page;

test.beforeAll(async () => {
    console.log("Start Checkout Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new Checkout_Stepone_Page(page);
    checkoutPage2 = new Checkout_Steptwo_Page(page);
    checkout_Complite_Page = new Checkout_Complite_Page(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Checkout Suite");
});

// TC-14 (FR-5.1 - FR-5.6)
test("TC-14 E2E happy path checkout with two items", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.click_GoToCart_Button();
    await cartPage.verify_CartItem("Sauce Labs Backpack");
    await cartPage.verify_CartItem("Sauce Labs Bike Light");
    await cartPage.click_Checkout_Button();

    await checkoutPage.set_FirstName_TextBox("Ivan");
    await checkoutPage.set_SecondName_TextBox("Petrov");
    await checkoutPage.set_PostalCode_TextBox("12345");
    await checkoutPage.click_Continue_Button();

    await checkoutPage2.verify_CartItem("Sauce Labs Backpack");
    await checkoutPage2.verify_CartItem("Sauce Labs Bike Light");

    await checkoutPage2.verify_PaymentInformation_Label();
    await checkoutPage2.verify_PriceTotal_Label();

    await checkoutPage2.verify_ShippingInformation_Label("Free Pony Express Delivery!");

    await checkoutPage2.verify_ItemTotal_Label("$39.98");

    await checkoutPage2.verify_Tax_Label("$3.20");

    await checkoutPage2.verify_Total_Label("$43.18");

    await checkoutPage2.click_Finish_Button();

    await checkout_Complite_Page.verify_PonyExpress_Image();
    await checkout_Complite_Page.verify_ThankYou_Label();

    await checkout_Complite_Page.verify_Dispatched_Label();

    await headerPage.verify_CartBadge_Hidden();

    await checkout_Complite_Page.click_BackHome_Button();

    await inventoryPage.verify_Inventory_Page();
});

// TC-15 (FR-5.2)
test("TC-15 Checkout step one validates required fields in order", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await headerPage.click_GoToCart_Button();
    await cartPage.click_Checkout_Button();

    await checkoutPage.click_Continue_Button();

    await checkoutPage.verify_ErrorMessage_Label("Error: First Name is required");

    await checkoutPage.set_FirstName_TextBox("Ivan");
    await checkoutPage.click_Continue_Button();

    await checkoutPage.verify_ErrorMessage_Label("Error: Last Name is required");

    await checkoutPage.set_SecondName_TextBox("Petrov");
    await checkoutPage.click_Continue_Button();

    await checkoutPage.verify_ErrorMessage_Label("Error: Postal Code is required");

    await checkoutPage.click_Cancel_Button();

    await cartPage.verify_Cart_Page();

    await cartPage.verify_CartItem("Sauce Labs Backpack");
});

// TC-16 (FR-5.5)
test("TC-16 Cancel on checkout overview keeps the cart", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    await headerPage.click_GoToCart_Button();
    await cartPage.click_Checkout_Button();

    await checkoutPage.set_FirstName_TextBox("Ivan");
    await checkoutPage.set_SecondName_TextBox("Petrov");
    await checkoutPage.set_PostalCode_TextBox("12345");
    await checkoutPage.click_Continue_Button();

    await checkoutPage2.verify_CartItem("Sauce Labs Backpack");

    await checkoutPage2.click_Cancel_Button();

    await inventoryPage.verify_Inventory_Page();

    await headerPage.verify_CartBadge_Count(2);
});

// TC-17 (FR-5.4)
test("TC-17 Price total calculation for full cart of 6 items", async () => {

    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bolt T-Shirt");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Fleece Jacket");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Onesie");
    await inventoryPage.click_AddToCart_Button("Test.allTheThings() T-Shirt (Red)");

    await headerPage.verify_CartBadge_Count(6);

    await headerPage.click_GoToCart_Button();
    await cartPage.click_Checkout_Button();

    await checkoutPage.set_FirstName_TextBox("Ivan");
    await checkoutPage.set_SecondName_TextBox("Petrov");
    await checkoutPage.set_PostalCode_TextBox("12345");
    await checkoutPage.click_Continue_Button();

    await checkoutPage2.verify_PriceTotal_Label();

    await checkoutPage2.verify_ItemTotal_Label("$129.94");

    await checkoutPage2.verify_Tax_Label("$10.40");

    await checkoutPage2.verify_Total_Label("$140.34");
});
