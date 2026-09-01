import { test, expect } from "@playwright/test";

test.beforeEach("open main url", async ({ page }) => {
  await page.goto("https://www.qapractice.com/");
  await page.getByRole("button", { name: "Start Practicing" }).click();
});
test("Web Form Automation", async ({ page }) => {
  await expect(page).toHaveTitle(
    /Practice Sites for UI Automation — Selenium, Cypress & Playwright | QA Practice/,
  );
  await page
    .locator(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(5)",
    )
    .click();
  // await page.getByRole('heading',{name:'Web Form Automation Practice'});
  // await expect(page.title())
  const Country = page.getByTestId("forms-country");
  await Country.selectOption("Canada");
  await page.locator("#forms-title").selectOption({ value: "Mr." });
  await page.getByTestId("forms-first-name").fill("Ayyappa");
  await page.getByTestId("forms-last-name").fill("Reddy");
  await page.locator("#forms-dob").fill("2002-10-12");
  await page.getByPlaceholder("dd/mm/yyyy").fill("11/11/2025");
  await page.locator("#forms-email").fill("test@gmail.com");
  await page.getByTestId("forms-phone-code").selectOption({ value: "+91" });
  await page.locator("#forms-phone-number").fill("8886615622");
  await page.getByTestId("forms-comm-email").check();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("#forms-success")).toHaveText(
    "Details Successfully Added!",
  );
  await page.getByRole("button", { name: "Go Back to Form" }).click();
  await expect(page.locator(".fw-bold.section-heading.mb-2")).toHaveText(
    "Web Form Automation Practice",
  );
});
test("Login Successful Automation @smoke", async ({ page }) => {
  await page
    .locator("//div[@class='g-4 row']//div[1]//div[1]//div[1]//a[1]")
    .click();
  await page.getByPlaceholder("Enter your email").fill("user@premiumbank.com");
  await page.getByPlaceholder("Enter your password").fill("Bank@123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByTestId("login-success")).toContainText(
    "Login Successful",
  );
});

test("E-commerce Automation @regression", async ({ page }) => {
  await page
    .locator(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > a:nth-child(5)",
    )
    .click();
  expect(page).toHaveTitle("Dummy E-commerce | QA Practice");
  await page.getByTestId("ecom-category-electronics").click();
  await page.getByTestId("ecom-result-count").isVisible();
  await page.getByTestId("add-to-cart-3").click();
  await page.getByTestId("add-to-cart-6").click();
  const inventorycart = page.locator("#ecom-cart-button");
  expect(inventorycart).toHaveText("2");
  await inventorycart.click();
  await page.getByRole("button", { name: "Proceed to Buy" }).click();
  await page.getByTestId("ecom-address-name").fill("test");
  await page.getByTestId("ecom-address-street").fill("test");
  await page.locator("#ecom-address-city").fill("fill");
  await page.locator("#ecom-address-state:visible").fill("fill");
  await page.locator('input[name="zip"]').fill("zipcode");
  await page
    .getByRole("button", { name: "Save Address & Continue to Payment" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Payment Details" }),
  ).toBeVisible();
  await page.locator('input[name="cardNumber"]').fill("798645468516845684");
  await page.locator("#ecom-expiry:visible").fill("11/11");
  await page.locator("#ecom-cvv").fill("112");
  await page.getByRole("button", { name: "Buy Now" }).click();
  await expect(page.getByTestId("ecom-order-success")).toContainText(
    "Order Successful!",
  );
});
test("Flight Booking Automation @regression @smoke", async ({ page }) => {
  await page
    .locator(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > a:nth-child(5)",
    )
    .click();
  await page.locator("#flight-from").selectOption({ value: "London" });
  await page.locator("#flight-to").selectOption({ value: "New York" });
  await page.locator("#flight-departing").fill("2025-11-11");
  await page.locator("#flight-returning").fill("2025-11-20");
  await page.getByRole("button", { name: "Search Flights" }).click();
  await page.getByTestId("flight-sort").selectOption("price-asc");
  await page.getByTestId("flight-select-GW100").click();
  await page.getByTestId("flight-continue-to-passengers").click();

  // Step 3 — passenger details
  await page.getByTestId("flight-passenger-name").fill("Ada Lovelace");
  await page.getByTestId("flight-passenger-email").fill("ada@example.com");
  await page.getByTestId("flight-passenger-phone").fill("+15550100");
  await page.getByTestId("flight-continue-to-payment").click();

  // Step 4 — payment
  await page.getByTestId("flight-card-number").fill("4111111111111111");
  await page.getByTestId("flight-expiry").fill("12/30");
  await page.getByTestId("flight-cvv").fill("123");
  await page.getByTestId("flight-book").click();

  // Step 5 — confirmation
  await expect(page.getByTestId("flight-booking-success")).toContainText(
    "Booking Confirmed",
  );
});
