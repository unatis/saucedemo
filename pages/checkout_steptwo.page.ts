import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { Checkout_Steptwo_PageMap } from "../mapper/checkout_steptwo.map";

export class Checkout_Steptwo_Page extends BasePage<Checkout_Steptwo_PageMap> {

    constructor(page: Page) {
        super(page, Checkout_Steptwo_PageMap);
    }

    async verify_PaymentInformation_Label() {
        const shipment = await this.map.PaymentInformation_Labe().innerText();
        expect(shipment).toMatch(/#\d+/);
    }

    async verify_PriceTotal_Label() {
        const shipment = await this.map.PriceTotal_Label().innerText();
        expect(shipment).toMatch(/\$\d+\.\d+/);
    }

    async verify_CartItem(itemName: string) {

        let flgFound = false;
        const allRows = await this.map.CartItems();
        const rowCount = await allRows.count();

        for (let i = 0; i < rowCount; i++) {

            const itemNameFound = await allRows.nth(i).locator(this.map.CartItemTitle()).innerText();

            if (itemNameFound === itemName) {
                flgFound = true;
                break;
            }
        }

        if (!flgFound) {
            throw new Error(`Item name ${itemName} not found in list`);
        }
    }

    async click_Finish_Button() {
        await this.map.Finish_Button().click();
    }

    async click_Cancel_Button() {
        await this.map.Cancel_Button().click();
    }

    async verify_ShippingInformation_Label(shippingInfo: string) {
        await expect(this.map.ShippingInformation_Label()).toHaveText(shippingInfo);
    }

    async verify_ItemTotal_Label(amount: string) {
        await expect(this.map.ItemTotal_Label()).toHaveText(`Item total: ${amount}`);
    }

    async verify_Tax_Label(amount: string) {
        await expect(this.map.Tax_Label()).toHaveText(`Tax: ${amount}`);
    }

    async verify_Total_Label(amount: string) {
        await expect(this.map.Total_Label()).toHaveText(`Total: ${amount}`);
    }

}