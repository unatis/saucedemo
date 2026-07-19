import { type Locator, type Page } from '@playwright/test';

export class LoginPageMap {

    constructor(public page: Page) { }

    userName_TextBox(): Locator {
        return this.page.locator("input[data-test='username']");
    }

    password_TextBox(): Locator {
        return this.page.locator("input[data-test='password']");
    }

    login_Button(): Locator {
        return this.page.locator("input[data-test='login-button']");
    }

    login_Page(): Locator {
        return this.page.locator("div.login_wrapper");
    }
}