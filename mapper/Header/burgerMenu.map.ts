import { type Locator, type Page } from '@playwright/test';

export class BurgerMenuPageMap {

    constructor(public page: Page) { }

    BurgerMenu_PopUp(): Locator {
        return this.page.locator(`div.bm-menu-wrap`);
    }

    BurgerMenu_Element(itemName: string): Locator {
        return this.page.locator(`//div[@class='bm-menu-wrap']//a[contains(text(),'${itemName}')]`);
    }
}