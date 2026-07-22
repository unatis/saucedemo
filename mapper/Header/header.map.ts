import { type Locator, type Page } from '@playwright/test';

export class HeaderPageMap {

    constructor(public page: Page) { }

    GoToCart_Button(): Locator {
        return this.page.locator(`//a[@data-test="shopping-cart-link"]`);
    }

    Burger_Button(): Locator {
        return this.page.locator(`#react-burger-menu-btn`);
    }

    CartBadge_Label(): Locator {
        return this.page.locator(`span[data-test='shopping-cart-badge']`);
    }

    Logo_Label(): Locator {
        return this.page.locator(`div.app_logo`);
    }
}