import { type Locator, type Page} from '@playwright/test';

export class CartPageMap {

    constructor(public page: Page){}

ItemInCart(itemName:string): Locator {
        return this.page.locator(`//div[@class='cart_list']/div[@class='cart_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]`);
    }

Checkout_Button(): Locator {
        return this.page.locator(`#checkout`);
    }

}