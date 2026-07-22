import { expect, type Page } from '@playwright/test';

import { BasePage } from "../../base.page";
import { FooterPageMap } from "../../mapper/Footer/footer.map";
import { SocialLinks } from "../../enums/footerEnum";

export class FooterPage extends BasePage<FooterPageMap> {

    constructor(page: Page) {
        super(page, FooterPageMap);
    }

    async verify_Footer_Label() {
        await expect(this.map.Footer()).toBeVisible();
        await expect(this.map.Footer_Label()).toHaveText("© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy");
    }

    async verify_TermsOfService_NotLink() {
        await expect(this.map.Footer_Label().locator("a")).toHaveCount(0);
    }

    async verify_SocialLink_Href(socialName: SocialLinks, href: string) {
        await expect(this.map.SocialLink(socialName)).toHaveAttribute("href", href);
    }
}
