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
    console.log("Start Special Users Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    burgerMenuPage = new BurgerMenuPage(page);
    await page.goto('/');
});

test.afterAll(async ({ }) => {
    console.log("End Special Users Suite");
});

// TC-20 (FR-8.1)
test("TC-20 problem_user sees the same placeholder image for all items", async () => {

    await loginPage.set_UserName_TextBox("problem_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    await inventoryPage.verify_InventoryItem_Images_AreSame("sl-404");
});

// TC-21 (FR-8.2)
test("TC-21 performance_glitch_user page load is slower than standard_user", async ({ page }) => {

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");

    const standardStart = Date.now();
    await loginPage.click_Login_Button();
    await inventoryPage.verify_Inventory_Page();
    const standardDuration = Date.now() - standardStart;
    console.log(`standard_user login duration: ${standardDuration} ms`);

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();
    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.LOGOUT);
    await loginPage.verify_Login_Page();

    await loginPage.set_UserName_TextBox("performance_glitch_user");
    await loginPage.set_Password_TextBox("secret_sauce");

    const glitchStart = Date.now();
    await loginPage.click_Login_Button();
    await inventoryPage.verify_Inventory_Page();
    const glitchDuration = Date.now() - glitchStart;
    console.log(`performance_glitch_user login duration: ${glitchDuration} ms`);

    expect(glitchDuration).toBeGreaterThan(standardDuration);
});

// TC-22 (FR-8.3)
test("TC-22 error_user cart and checkout handlers misbehave", async () => {

    await loginPage.set_UserName_TextBox("error_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    // FR-8.3: some add/remove handlers throw errors - the baseline below records the actual behavior
    await inventoryPage.click_AddToCart_Button("Sauce Labs Backpack");
    await inventoryPage.click_AddToCart_Button("Sauce Labs Bike Light");

    const badgeAfterAdds = await headerPage.get_CartBadge_Count();
    console.log(`error_user: attempted 2 adds, badge shows ${badgeAfterAdds}`);
    expect(badgeAfterAdds).toBeGreaterThan(0);

    await inventoryPage.click_Remove_Button("Sauce Labs Backpack");

    const badgeAfterRemove = await headerPage.get_CartBadge_Count();
    console.log(`error_user: after remove attempt, badge shows ${badgeAfterRemove}`);

    // FR-8.3 baseline: remove handler is broken for error_user - the item stays in the cart
    await inventoryPage.verify_Remove_Button("Sauce Labs Backpack");
});

// TC-23 (FR-8.4)
test("TC-23 visual_user layout is visually distorted", async ({ page }) => {

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    const standardScreenshot = await page.screenshot({ fullPage: true });

    await headerPage.click_Burger_Menu();
    await burgerMenuPage.verify_BurgerMenu_PopUp();
    await burgerMenuPage.click_BurgerMenu_Item(BurgerMenuItems.LOGOUT);
    await loginPage.verify_Login_Page();

    await loginPage.set_UserName_TextBox("visual_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();

    await inventoryPage.verify_Inventory_Page();

    const visualScreenshot = await page.screenshot({ fullPage: true });

    // FR-8.4: visual_user layout is intentionally distorted, so the pages must differ
    expect(standardScreenshot.equals(visualScreenshot)).toBe(false);
});
