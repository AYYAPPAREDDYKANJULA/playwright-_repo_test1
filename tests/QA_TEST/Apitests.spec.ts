import { test, expect, request } from "@playwright/test";

const baseURL = "https://restful-booker.herokuapp.com";

let token: string;
let bookingid: number;

test.beforeAll(async ({ request }) => {

  // Create token
  const authResponse = await request.post(`${baseURL}/auth`, {
    data: {
      username: "admin",
      password: "password123"
    }
  });

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();
  token = authBody.token;
  expect(token).toBeTruthy();

  // Create booking
  const bookingResponse = await request.post(`${baseURL}/booking`, {
    data: {
      firstname: "Jim",
      lastname: "Brown",
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: "2018-01-01",
        checkout: "2019-01-01"
      },
      additionalneeds: "Breakfast"
    }
  });

  expect(bookingResponse.status()).toBe(200);

  const bookingBody = await bookingResponse.json();

  bookingid = bookingBody.bookingid;

  expect(bookingid).toBeTruthy();

  console.log("Token:", token);
  console.log("Booking ID:", bookingid);
});


test("UpdateBooking", async ({ request }) => {

  const response = await request.put(
    `${baseURL}/booking/${bookingid}`,
    {
      headers: {
        Cookie: `token=${token}`
      },
      data: {
        firstname: "James",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01"
        },
        additionalneeds: "Breakfast"
      }
    }
  );

  console.log("Status:", response.status());
  console.log("Response:", await response.text());

  expect(response.status()).toBe(200);
});

test("partialUpdateBooking", async ({ request }) => {
    const response = await request.patch(`${baseURL}/booking/${bookingid}`, {
        headers: { Cookie: `token=${token}` },
        data: { firstname: "James", lastname: "Brown" }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
});
test.afterAll('delete booking',async ({ request})=>{
    const response = await request.delete(`${baseURL}/booking/${bookingid}`,
         {headers:{cookie:`token=${token}`}});
    expect(response.status()).toBe(201);
    const responseBody = await response.text();
    console.log("Delete Response:", responseBody);
    const getResponse = await request.get(`${baseURL}/booking/${bookingid}`);
    expect(getResponse.status()).toBe(404);

});