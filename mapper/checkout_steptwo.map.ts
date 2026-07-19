import { type Locator, type Page } from '@playwright/test';

export class Checkout_Steptwo_PageMap {

    constructor(public page: Page) { }

    PaymentInformation_Labe(): Locator {
        return this.page.locator("//div[@data-test='payment-info-value']");
    }

    PriceTotal_Label(): Locator {
        return this.page.locator("//div[@data-test='subtotal-label']");
    }

    CartItems(): Locator {
        return this.page.locator("//div[@data-test='cart-list']/div[@data-test='inventory-item']");
    }

    CartItemTitle(): Locator {
        return this.page.locator("div[data-test='inventory-item-name']");
    }

    Finish_Button(): Locator {
        return this.page.locator("button[data-test='finish']");
    }
}