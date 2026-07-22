import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { FooterPage } from '../pages/Footer/footer.page';
import { SocialLinks } from '../enums/footerEnum';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let footerPage: FooterPage;

test.beforeAll(async () => {
    console.log("Start Footer Suite");
});

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    footerPage = new FooterPage(page);
    await page.goto('/');

    await loginPage.set_UserName_TextBox("standard_user");
    await loginPage.set_Password_TextBox("secret_sauce");
    await loginPage.click_Login_Button();
});

test.afterAll(async ({ }) => {
    console.log("End Footer Suite");
});

// TC-19 (FR-7.1, FR-7.2)
test("TC-19 Footer content and social links", async () => {

    await inventoryPage.verify_Inventory_Page();

    await footerPage.verify_Footer_Label();

    await footerPage.verify_TermsOfService_NotLink();

    await footerPage.verify_SocialLink_Href(SocialLinks.TWITTER, "https://twitter.com/saucelabs");
    await footerPage.verify_SocialLink_Href(SocialLinks.FACEBOOK, "https://www.facebook.com/saucelabs");
    await footerPage.verify_SocialLink_Href(SocialLinks.LINKEDIN, "https://www.linkedin.com/company/sauce-labs/");
});
