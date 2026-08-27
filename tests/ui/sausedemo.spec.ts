// import {test,expect} from "@playwright/test";

// test('basetest',async({page})=>{
//     await page.goto("https://www.saucedemo.com/");
//     await page.locator('#user-name').fill("standard_user");
//     await page.getByPlaceholder('Password').fill("secret_sauce");
//     await page.getByRole('button',{name:'Login'}).click();
//     // await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//     await page.locator('[data-test="shopping-cart-link"]').click();
//     const names = await page.locator('[data-test="inventory-item-name"]').allTextContents();
//     expect(names).toEqual(expect.arrayContaining(['BACKPACK', 'BIKE_LIGHT']));
//     console.log(names);
// })