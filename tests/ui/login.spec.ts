import { test, expect } from '../../fixtures';

test.describe('Login', () => {
  test('successful login lands on Products page', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('invalid credentials show an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});
