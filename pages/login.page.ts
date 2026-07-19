import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { LoginPageMap } from '../mapper/login.map';

export class LoginPage extends BasePage<LoginPageMap> {

    constructor(page: Page) {
        super(page, LoginPageMap);
    }

    async set_UserName_TextBox(loginName: string) {
        await this.map.userName_TextBox().fill(loginName);
    }

    async set_Password_TextBox(password: string) {
        await this.map.password_TextBox().fill(password);
    }

    async click_Login_Button() {
        await this.map.login_Button().click();
    }

    async verify_Login_Page() {

        await expect(this.map.login_Page()).toBeVisible();

    }
}