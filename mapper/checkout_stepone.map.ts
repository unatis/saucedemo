import { type Locator, type Page } from '@playwright/test';

export class Checkout_Stepone_PageMap {

    constructor(public page: Page){}

firstName_TextBox(): Locator{
        return this.page.locator("#first-name");
    }

secondName_TextBox(): Locator{
        return this.page.locator("#last-name");
    }

postalCode_TextBox(): Locator{
        return this.page.locator("#postal-code");
    }

continue_Button(): Locator{
        return this.page.locator("#continue");
    }

cancel_Button(): Locator{
        return this.page.locator("button[data-test='cancel']");
    }

errorMessage_Label(): Locator{
        return this.page.locator("h3[data-test='error']");
    }

}

