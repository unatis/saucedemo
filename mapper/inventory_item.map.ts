import { type Locator, type Page } from '@playwright/test';

export class Inventory_Item_PageMap {

    constructor(public page: Page) { }

    InventoryItem_Page(): Locator {
        return this.page.locator(`div.inventory_details_container`);
    }

    InventoryItem_Name(): Locator {
        return this.page.locator(`div[data-test='inventory-item-name']`);
    }

    InventoryItem_Price(): Locator {
        return this.page.locator(`div[data-test='inventory-item-price']`);
    }

    InventoryItem_Image(): Locator {
        return this.page.locator(`img.inventory_details_img`);
    }

    AddToCart_Button(): Locator {
        return this.page.locator(`button[data-test='add-to-cart']`);
    }

    Remove_Button(): Locator {
        return this.page.locator(`button[data-test='remove']`);
    }

    BackToProducts_Button(): Locator {
        return this.page.locator(`button[data-test='back-to-products']`);
    }
}
