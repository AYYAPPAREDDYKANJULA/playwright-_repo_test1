import { test, expect } from '../../fixtures';

test.describe('Checkout', () => {
  test('complete purchase flow shows confirmation', async ({
    loggedInPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout requires customer info', async ({ loggedInPage, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.Errormessage).toBeVisible();
  });
});
