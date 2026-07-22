import { type expect, type Page } from '@playwright/test';

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


}
