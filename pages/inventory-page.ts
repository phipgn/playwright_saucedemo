import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.locator("//span[text()='Products']");
    }

    async goto() {
        await this.page.goto("/inventory.html");
    }

    async isHeaderVisible() {
        return await this.header.isVisible();
    }

    async getProductItems(): Promise<ProductItem[]> {
        const elements = await this.page.locator('.inventory_item').all();
        return elements.map((_, i) => new ProductItem(this.page, i + 1));
    }
}

class ProductItem {
    readonly title: Locator;
    readonly price: Locator;

    constructor(page: Page, index: number) {
        this.title = page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_name ']");
        this.price = page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_price']");
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getPrice() {
        return await this.price.textContent();
    }
}