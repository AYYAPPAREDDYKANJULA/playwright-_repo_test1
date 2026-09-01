import { test, expect } from "../../fixtures/apiFixtures";
import path from "path";
import { readBookingCSV } from "../../utils/csvReader";

const csvPath = path.join(
  process.cwd(),
  "test-data",
  "bookingData.csv"
);

const bookingData = readBookingCSV(csvPath);

test.describe("Restful Booker API Tests", () => {

  test("Create Booking", async ({ createBooking }) => {
    const data = bookingData[0];

    const booking = {
      firstname: data.firstname,
      lastname: data.lastname,
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const result = await createBooking(booking);

    expect(result.bookingid).toBeTruthy();
    expect(result.booking.firstname).toBe(data.firstname);
    expect(result.booking.lastname).toBe(data.lastname);

    console.log("Booking ID:", result.bookingid);
  });


  test("Create and Get Booking", async ({
    createBooking,
    bookingAPI,
  }) => {
    const data = bookingData[0];

    const booking = {
      firstname: data.firstname,
      lastname: data.lastname,
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const result = await createBooking(booking);

    const bookingId = result.bookingid;

    expect(bookingId).toBeTruthy();

    const getBooking = await bookingAPI.getBooking(bookingId);

    expect(getBooking.firstname).toBe(data.firstname);
    expect(getBooking.lastname).toBe(data.lastname);

    console.log("Booking ID:", bookingId);
  });


  test("Create and Update Booking", async ({
    createBooking,
    bookingAPI,
    token,
  }) => {
    const data = bookingData[0];

    const booking = {
      firstname: data.firstname,
      lastname: data.lastname,
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const result = await createBooking(booking);

    const bookingId = result.bookingid;

    const updateData = {
      firstname: "UpdatedFirstName",
      lastname: "UpdatedLastName",
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const updated = await bookingAPI.updateBooking(
      bookingId,
      token,
      updateData
    );

    expect(updated.firstname).toBe("UpdatedFirstName");
    expect(updated.lastname).toBe("UpdatedLastName");

    console.log("Updated Booking:", updated);
  });


  test("Create and Partial Update Booking", async ({
    createBooking,
    bookingAPI,
    token,
  }) => {
    const data = bookingData[0];

    const booking = {
      firstname: data.firstname,
      lastname: data.lastname,
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const result = await createBooking(booking);

    const bookingId = result.bookingid;

    const updated = await bookingAPI.partialUpdateBooking(
      bookingId,
      token,
      {
        firstname: "Robert",
        lastname: "Brown",
      }
    );

    expect(updated.firstname).toBe("Robert");
    expect(updated.lastname).toBe("Brown");
  });


  test("Create and Delete Booking", async ({
    createBooking,
    bookingAPI,
    token,
  }) => {
    const data = bookingData[0];

    const booking = {
      firstname: data.firstname,
      lastname: data.lastname,
      totalprice: data.totalprice,
      depositpaid: data.depositpaid,
      bookingdates: {
        checkin: data.checkin,
        checkout: data.checkout,
      },
      additionalneeds: data.additionalneeds,
    };

    const result = await createBooking(booking);

    const bookingId = result.bookingid;

    const deleteResponse = await bookingAPI.deleteBooking(
      bookingId,
      token
    );

    expect(deleteResponse).toBe("Created");

    const status = await bookingAPI.getBookingStatus(bookingId);

    expect(status).toBe(404);

    console.log("Deleted Booking ID:", bookingId);
  });


  // 100 CSV-driven tests
  for (const data of bookingData) {

    test(
      `Data Driven - ${data.firstname} ${data.lastname}`,
      async ({ createBooking }) => {

        const booking = {
          firstname: data.firstname,
          lastname: data.lastname,
          totalprice: data.totalprice,
          depositpaid: data.depositpaid,
          bookingdates: {
            checkin: data.checkin,
            checkout: data.checkout,
          },
          additionalneeds: data.additionalneeds,
        };

        const result = await createBooking(booking);

        expect(result.bookingid).toBeTruthy();
        expect(result.booking.firstname).toBe(data.firstname);
        expect(result.booking.lastname).toBe(data.lastname);

        console.log(
          `${data.firstname} ${data.lastname} → ${result.bookingid}`
        );
      }
    );

  }

});