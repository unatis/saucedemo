import { type Locator, type Page} from '@playwright/test';

export class CartPageMap {

    constructor(public page: Page){}

ItemInCart(itemName:string): Locator {
        return this.page.locator(`//div[@class='cart_list']/div[@class='cart_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]`);
    }

Checkout_Button(): Locator {
        return this.page.locator(`#checkout`);
    }

ContinueShopping_Button(): Locator {
        return this.page.locator(`button[data-test='continue-shopping']`);
    }

Remove_Button(itemName: string): Locator {
        return this.page.locator(`//div[@class='cart_list']/div[@class='cart_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../..//button[text()='Remove']`);
    }

CartItem_Qty(itemName: string): Locator {
        return this.page.locator(`//div[@class='cart_list']/div[@class='cart_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../../..//div[@data-test='item-quantity']`);
    }

CartItem_Price(itemName: string): Locator {
        return this.page.locator(`//div[@class='cart_list']/div[@class='cart_item']//div[@data-test='inventory-item-name' and contains(text(),'${itemName}')]/../..//div[@data-test='inventory-item-price']`);
    }

Cart_Page(): Locator {
        return this.page.locator(`#cart_contents_container`);
    }

}