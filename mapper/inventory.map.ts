import { type Locator, type Page } from '@playwright/test';

export class InventoryPageMap {

    constructor(public page: Page) { }

    addToCart_Button(itemName: string): Locator {
        return this.page.locator(`//div[@class='inventory_list']/div[@class='inventory_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../../..//button[text()='Add to cart']`);
    }

    Inventory_Page(): Locator {
        return this.page.locator(`div[data-test='inventory-container']`);
    }

}