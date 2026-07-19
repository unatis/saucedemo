import { expect, type Page } from '@playwright/test';

import { BasePage } from "../../base.page";
import { BurgerMenuPageMap } from "../../mapper/Header/burgerMenu.map";
import { BurgerMenuItems } from "../../enums/headerEnum";

export class BurgerMenuPage extends BasePage<BurgerMenuPageMap> {

    constructor(page: Page) {
        super(page, BurgerMenuPageMap);
    }

    async verify_BurgerMenu_PopUp() {
        await expect(this.map.BurgerMenu_PopUp()).toBeVisible();
    }

    async click_BurgerMenu_Item(itemName: BurgerMenuItems) {

        switch (itemName) {
            case BurgerMenuItems.ABOUT:
                await this.map.BurgerMenu_Element(BurgerMenuItems.ABOUT).click();
                break;
            case BurgerMenuItems.ALLITEMS:
                await this.map.BurgerMenu_Element(BurgerMenuItems.ALLITEMS).click();
                break;
            case BurgerMenuItems.LOGOUT:
                await this.map.BurgerMenu_Element(BurgerMenuItems.LOGOUT).click();
                break;
            case BurgerMenuItems.RESETAPPSTATE:
                await this.map.BurgerMenu_Element(BurgerMenuItems.RESETAPPSTATE).click();
                break;
        }

    }

}
