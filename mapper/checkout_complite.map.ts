import { type Locator, type Page } from '@playwright/test';

export class Checkout_Complite_PageMap {

    constructor(public page: Page) { }

    PonyExpress_Image(): Locator {
        return this.page.locator("//img[@data-test='pony-express']");
    }

    ThankYou_Label(): Locator {
        return this.page.locator("//h2[@data-test='complete-header']");
    }

    BackHome_Button(): Locator {
        return this.page.locator("//button[@data-test='back-to-products']");
    }


}