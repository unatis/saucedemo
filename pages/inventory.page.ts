import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { InventoryPageMap } from '../mapper/inventory.map';

export class InventoryPage extends BasePage<InventoryPageMap> {

        constructor(page: Page) {
                super(page, InventoryPageMap);
        }

        async click_AddToCart_Button(itemName: string) {
                await this.map.addToCart_Button(itemName).click();
        }

        async verify_Inventory_Page() {

                const count = await this.map.Inventory_Page().count();
                expect(count).toEqual(1);
                await expect(this.page).toHaveURL("inventory.html");

        }
}