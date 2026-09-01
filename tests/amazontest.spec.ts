import {test,expect} from '@playwright/test'

test("amazon login", async ({ page }) => {
    await page.goto('https://www.amazon.in/');
    const scearch_box= page.locator("//input[@id='twotabsearchtextbox']");
    const scearchbutton=page.locator('//input[@type="submit"]')
    await scearch_box.fill("iphone 17 256");
    await scearchbutton.click();
    // const products= page.locator('//div//span[@data-component-type="s-search-results"]');
    // const best_seller=products.filter({has: page.getByText('Best seller',{exact:true})});
    // const product_name= await best_seller.locator('h2').innerText();
    // console.log('Best seller Product: ',product_name);
    // expect(product_name).toContain('iPhone 17');
    // expect(product_name).toContain('256');
    // await best_seller.getByRole('button',{ name: 'Add to cart' });
})