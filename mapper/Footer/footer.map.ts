import { type Locator, type Page } from '@playwright/test';

export class FooterPageMap {

    constructor(public page: Page) { }

    Footer(): Locator {
        return this.page.locator(`footer[data-test='footer']`);
    }

    Footer_Label(): Locator {
        return this.page.locator(`div[data-test='footer-copy']`);
    }

    SocialLink(socialName: string): Locator {
        return this.page.locator(`a[data-test='${socialName}']`);
    }
}
