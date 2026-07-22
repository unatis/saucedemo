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
    console.log("Start Auth Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto('/');
});

test.afterAll(async ({ }) => {
    console.log("End Auth Suite");
});

// TC-01 (FR-1.1, FR-1.5)
test("TC-01 Successful login of standard user", async () => {

    await loginPage.verify_Login_Page();

    await loginPage.verify_Password_TextBox_Masked();

    await loginPage.verify_Credentials_Label();

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();
});

// TC-02 (FR-1.2)
test("TC-02 Login with empty username shows error", async () => {

    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await loginPage.verify_Login_Page();

    await loginPage.verify_ErrorMessage_Label("Epic sadface: Username is required");

    await loginPage.click_ErrorClose_Button();

    await loginPage.verify_ErrorMessage_Hidden();
});

// TC-03 (FR-1.2)
test("TC-03 Login with empty password shows error", async () => {

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.click_Login_Button();

    await loginPage.verify_Login_Page();

    await loginPage.verify_ErrorMessage_Label("Epic sadface: Password is required");
});

// TC-04 (FR-1.2)
test("TC-04 Login with wrong username/password pair shows error", async () => {

    await loginPage.set_UserName_TextBox("wrong_user");
    await loginPage.set_Password_TextBox("wrong_pass");
    await loginPage.click_Login_Button();

    await loginPage.verify_Login_Page();

    await loginPage.verify_ErrorMessage_Label("Epic sadface: Username and password do not match any user in this service");
});

// TC-05 (FR-1.3)
test("TC-05 Login of locked out user is rejected", async () => {

    await loginPage.set_UserName_TextBox("locked_out_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await loginPage.verify_Login_Page();

    await loginPage.verify_ErrorMessage_Label("Epic sadface: Sorry, this user has been locked out.");
});

// TC-06 (FR-1.4)
test("TC-06 Direct access to internal routes without session redirects to login", async ({ page }) => {

    const internalRoutes = [
        '/inventory.html',
        '/cart.html',
        '/checkout-step-one.html',
        '/checkout-step-two.html',
        '/checkout-complete.html',
        '/inventory-item.html?id=4'
    ];

    for (const route of internalRoutes) {
        await page.goto(route);
        await loginPage.verify_Login_Page();

        const routePath = route.split('?')[0];
        await loginPage.verify_ErrorMessage_Label(`Epic sadface: You can only access '${routePath}' when you are logged in.`);
    }
});

// TC-07 (FR-1.6)
test("TC-07 Logout via burger menu ends the session", async ({ page }) => {

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();
    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.LOGOUT);

    await loginPage.verify_Login_Page();

    await page.goto('/inventory.html');
    await loginPage.verify_Login_Page();

    await loginPage.verify_ErrorMessage_Label("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});
