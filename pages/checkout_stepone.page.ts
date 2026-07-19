import { expect, type Page } from '@playwright/test';

import { BasePage } from  "../base.page";
import { Checkout_Stepone_PageMap } from "../mapper/checkout_stepone.map";

export class Checkout_Stepone_Page extends BasePage<Checkout_Stepone_PageMap>{

    constructor(page: Page){
                super(page, Checkout_Stepone_PageMap);
                }
                
    async set_FirstName_TextBox(firstName: string) {
            await this.map.firstName_TextBox().fill(firstName);
        }

    async set_SecondName_TextBox(secondName: string) {
            await this.map.secondName_TextBox().fill(secondName);
        }

    async set_PostalCode_TextBox(postalCode: string) {
            await this.map.postalCode_TextBox().fill(postalCode);
        }
    async click_Continue_Button() {
            await this.map.continue_Button().click();
        }
    }