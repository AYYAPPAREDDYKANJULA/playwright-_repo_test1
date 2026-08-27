import { type Locator, type Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.textContent());
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItems.locator('[data-test="inventory-item-name"]').allTextContents();
  }
}
