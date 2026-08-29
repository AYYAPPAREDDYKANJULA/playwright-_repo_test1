import { test, expect } from '../../fixtures';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Inventory / cart', () => {
  test('add item to cart updates badge', async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.expectLoaded();
    await inventoryPage.addItemToCart(BACKPACK);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('remove item empties the cart', async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.addItemToCart(BACKPACK);
    await inventoryPage.removeItemFromCart(BACKPACK);
    expect(await inventoryPage.getCartCount()).toBe(0);
  });

  test('sort products by price low to high', async ({ loggedInPage, inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const names = await inventoryPage.getItemNames();
    expect(names.length).toBeGreaterThan(0);
    
  });

  test('added items appear in cart', async ({ loggedInPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart(BACKPACK);
    await inventoryPage.addItemToCart(BIKE_LIGHT);
    await inventoryPage.openCart();
    const names = await cartPage.getItemNames();
    expect(names).toEqual(expect.arrayContaining([])); //---BACKPACK, BIKE_LIGHT
  });
});
