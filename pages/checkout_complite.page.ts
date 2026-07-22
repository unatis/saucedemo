import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { Checkout_Complite_PageMap } from "../mapper/checkout_complite.map";

export class Checkout_Complite_Page extends BasePage<Checkout_Complite_PageMap> {

    constructor(page: Page) {
        super(page, Checkout_Complite_PageMap);
    }

    async verify_PonyExpress_Image() {
        const srcAttr = await this.map.PonyExpress_Image().getAttribute("src");
        expect(srcAttr).toContain("checkmark-VLWQafip.png");
    }

    async verify_ThankYou_Label() {
        expect(this.map.ThankYou_Label()).toContainText("Thank you for your order!");
    }

    async click_BackHome_Button() {
        await this.map.BackHome_Button().click();
    }

    async verify_Dispatched_Label() {
        await expect(this.map.Dispatched_Label()).toContainText("Your order has been dispatched");
    }

}