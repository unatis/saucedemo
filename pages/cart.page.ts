import { expect, type Page } from '@playwright/test';

import { BasePage } from  "../base.page";
import { CartPageMap } from  "../mapper/cart.map";

export class CartPage extends BasePage<CartPageMap>{

    constructor(page: Page){
                super(page, CartPageMap);
                }

    async verify_CartItem(itemName: string) {
            await expect(this.map.ItemInCart(itemName)).toHaveText(itemName);
            console.log(`"${itemName}" is in Cart`);

        }

  async click_Checkout_Button() {
            await this.map.Checkout_Button().click();
        }
    }
