import { expect, type Page } from '@playwright/test';

import { BasePage } from "../base.page";
import { InventoryPageMap } from '../mapper/inventory.map';
import { SortOptions } from '../enums/inventoryEnum';

export class InventoryPage extends BasePage<InventoryPageMap> {

        constructor(page: Page) {
                super(page, InventoryPageMap);
        }

        async click_AddToCart_Button(itemName: string) {
                await this.map.addToCart_Button(itemName).click();
        }

        async verify_Inventory_Page() {

                const count = await this.map.Inventory_Page().count();
                expect(count).toEqual(1);
                await expect(this.page).toHaveURL("inventory.html");

        }

        async click_Remove_Button(itemName: string) {
                await this.map.remove_Button(itemName).click();
        }

        async verify_Remove_Button(itemName: string) {
                await expect(this.map.remove_Button(itemName)).toBeVisible();
        }

        async verify_AddToCart_Button(itemName: string) {
                await expect(this.map.addToCart_Button(itemName)).toBeVisible();
        }

        async verify_InventoryItems_Count(count: number) {
                await expect(this.map.inventoryItems()).toHaveCount(count);
        }

        async verify_InventoryItem_Price(itemName: string, price: string) {
                await expect(this.map.inventoryItem_Price(itemName)).toHaveText(price);
        }

        async select_Sort_ComboBox(option: SortOptions) {
                await this.map.sort_ComboBox().selectOption({ label: option });
        }

        async verify_Sort_ComboBox_Selected(option: SortOptions) {
                await expect(this.map.sort_ComboBox().locator("option:checked")).toHaveText(option);
        }

        async verify_FirstInventoryItem_Name(itemName: string) {
                await expect(this.map.firstInventoryItem_Name()).toHaveText(itemName);
        }

        async click_ItemName_Link(itemName: string) {
                await this.map.itemName_Link(itemName).click();
        }

        async click_ItemImage_Link(itemName: string) {
                await this.map.itemImage_Link(itemName).click();
        }

        async verify_InventoryItem_Images_AreSame(srcPart: string) {

                const allImages = this.map.inventoryItem_Images();
                const imageCount = await allImages.count();
                expect(imageCount).toBeGreaterThan(0);

                for (let i = 0; i < imageCount; i++) {
                        const srcAttr = await allImages.nth(i).getAttribute("src");
                        expect(srcAttr).toContain(srcPart);
                }
        }

        async verify_DataTest_Attributes() {
                await expect(this.map.Inventory_Page()).toHaveCount(1);
                await expect(this.map.addToCart_Buttons()).toHaveCount(6);
        }
}