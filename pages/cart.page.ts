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

  async click_ContinueShopping_Button() {
            await this.map.ContinueShopping_Button().click();
        }

  async click_Remove_Button(itemName: string) {
            await this.map.Remove_Button(itemName).click();
        }

  async verify_CartItem_Removed(itemName: string) {
            await expect(this.map.ItemInCart(itemName)).toHaveCount(0);
        }

  async verify_CartItem_Qty(itemName: string, qty: number) {
            await expect(this.map.CartItem_Qty(itemName)).toHaveText(String(qty));
        }

  async verify_CartItem_Price(itemName: string, price: string) {
            await expect(this.map.CartItem_Price(itemName)).toHaveText(price);
        }

  async verify_Cart_Page() {
            await expect(this.map.Cart_Page()).toBeVisible();
            await expect(this.page).toHaveURL("cart.html");
        }
    }
