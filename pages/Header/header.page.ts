import { expect, type Page } from '@playwright/test';

import { BasePage } from "../../base.page";
import { HeaderPageMap } from "../../mapper/Header/header.map";

export class HeaderPage extends BasePage<HeaderPageMap> {

    constructor(page: Page) {
        super(page, HeaderPageMap);
    }
    async click_GoToCart_Button() {
        await this.map.GoToCart_Button().click();
    }

    async click_Burger_Menu() {
        await this.map.Burger_Button().click();
    }

    async verify_CartBadge_Count(count: number) {
        await expect(this.map.CartBadge_Label()).toHaveText(String(count));
    }

    async verify_CartBadge_Hidden() {
        await expect(this.map.CartBadge_Label()).toBeHidden();
    }

    async get_CartBadge_Count(): Promise<number> {
        if (await this.map.CartBadge_Label().count() === 0) {
            return 0;
        }
        return Number(await this.map.CartBadge_Label().innerText());
    }

    async verify_Logo_Label() {
        await expect(this.map.Logo_Label()).toHaveText("Swag Labs");
    }

    async verify_Burger_Button() {
        await expect(this.map.Burger_Button()).toBeVisible();
    }

    async verify_GoToCart_Button() {
        await expect(this.map.GoToCart_Button()).toBeVisible();
    }

}
