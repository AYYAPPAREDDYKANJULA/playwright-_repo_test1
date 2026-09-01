import {
  APIRequestContext,
  expect
} from "@playwright/test";

export class BookingAPI {

  constructor(private request: APIRequestContext) {}

  async createBooking(data: any) {

    const response = await this.request.post("/booking", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      data,
    });

    expect(response.status()).toBe(200);

    return await response.json();
  }


  async getBooking(bookingId: number) {

    const response = await this.request.get(
      `/booking/${bookingId}`
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }


  async getBookingStatus(bookingId: number) {

    const response = await this.request.get(
      `/booking/${bookingId}`
    );

    return response.status();
  }


  async updateBooking(
    bookingId: number,
    token: string,
    data: any
  ) {

    const response = await this.request.put(
      `/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Cookie: `token=${token}`,
        },
        data,
      }
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }


  async partialUpdateBooking(
    bookingId: number,
    token: string,
    data: any
  ) {

    const response = await this.request.patch(
      `/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Cookie: `token=${token}`,
        },
        data,
      }
    );

    expect(response.status()).toBe(200);

    return await response.json();
  }


  async deleteBooking(
    bookingId: number,
    token: string
  ) {

    const response = await this.request.delete(
      `/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    expect(response.status()).toBe(201);

    return await response.text();
  }
}