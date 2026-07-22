import { type Locator, type Page } from '@playwright/test';

export class InventoryPageMap {

    constructor(public page: Page) { }

    addToCart_Button(itemName: string): Locator {
        return this.page.locator(`//div[@class='inventory_list']/div[@class='inventory_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../../..//button[text()='Add to cart']`);
    }

    Inventory_Page(): Locator {
        return this.page.locator(`div[data-test='inventory-container']`);
    }

    remove_Button(itemName: string): Locator {
        return this.page.locator(`//div[@class='inventory_list']/div[@class='inventory_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../../..//button[text()='Remove']`);
    }

    inventoryItems(): Locator {
        return this.page.locator(`div[data-test='inventory-item']`);
    }

    inventoryItem_Price(itemName: string): Locator {
        return this.page.locator(`//div[@class='inventory_list']/div[@class='inventory_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../../..//div[@data-test='inventory-item-price']`);
    }

    inventoryItem_Images(): Locator {
        return this.page.locator(`img.inventory_item_img`);
    }

    itemName_Link(itemName: string): Locator {
        return this.page.locator(`//a[div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]]`);
    }

    itemImage_Link(itemName: string): Locator {
        return this.page.locator(`//a[img[@alt='${itemName}']]`);
    }

    sort_ComboBox(): Locator {
        return this.page.locator(`select[data-test='product-sort-container']`);
    }

    firstInventoryItem_Name(): Locator {
        return this.page.locator(`div[data-test='inventory-item-name']`).first();
    }

    addToCart_Buttons(): Locator {
        return this.page.locator(`button[data-test^='add-to-cart']`);
    }

}