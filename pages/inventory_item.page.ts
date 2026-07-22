import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { Inventory_Item_PageMap } from '../mapper/inventory_item.map';

export class Inventory_Item_Page extends BasePage<Inventory_Item_PageMap> {

    constructor(page: Page) {
        super(page, Inventory_Item_PageMap);
    }

    async verify_InventoryItem_Page(itemName: string) {
        await expect(this.map.InventoryItem_Page()).toBeVisible();
        await expect(this.map.InventoryItem_Name()).toHaveText(itemName);
        await expect(this.map.InventoryItem_Image()).toBeVisible();
        await expect(this.page).toHaveURL(/inventory-item\.html\?id=\d+/);
    }

    async verify_InventoryItem_Price(price: string) {
        await expect(this.map.InventoryItem_Price()).toHaveText(price);
    }

    async click_AddToCart_Button() {
        await this.map.AddToCart_Button().click();
    }

    async verify_Remove_Button() {
        await expect(this.map.Remove_Button()).toBeVisible();
    }

    async click_BackToProducts_Button() {
        await this.map.BackToProducts_Button().click();
    }
}
