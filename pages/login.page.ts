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

    async verify_ErrorMessage_Label(message: string) {
        await expect(this.map.errorMessage_Label()).toContainText(message);
    }

    async click_ErrorClose_Button() {
        await this.map.errorClose_Button().click();
    }

    async verify_ErrorMessage_Hidden() {
        await expect(this.map.errorMessage_Label()).toBeHidden();
    }

    async verify_Password_TextBox_Masked() {
        await expect(this.map.password_TextBox()).toHaveAttribute("type", "password");
    }

    async verify_Credentials_Label() {
        await expect(this.map.credentials_Label()).toBeVisible();
        await expect(this.map.credentials_Label()).toContainText("standard_user");
    }

    async verify_DataTest_Attributes() {
        await expect(this.map.userName_TextBox()).toHaveCount(1);
        await expect(this.map.password_TextBox()).toHaveCount(1);
        await expect(this.map.login_Button()).toHaveCount(1);
    }
}