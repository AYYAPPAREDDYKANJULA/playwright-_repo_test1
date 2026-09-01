import { test as base, expect } from "@playwright/test";
import { AuthAPI } from "../pages/API/Auth";
import { BookingAPI } from "../pages/API/BookingAPI";

type APIFixtures = {
  authAPI: AuthAPI;
  bookingAPI: BookingAPI;
  token: string;
  createBooking: (data: any) => Promise<{
    bookingid: number;
    booking: any;
  }>;
};
export const test = base.extend<APIFixtures>({
  authAPI: async ({ request }, use) => {
    const authAPI = new AuthAPI(request);
    await use(authAPI);
  },
  bookingAPI: async ({ request }, use) => {
    const bookingAPI = new BookingAPI(request);
    await use(bookingAPI);
  },
  token: async ({ authAPI }, use) => {
    const token = await authAPI.createToken();
    await use(token);
  },

  createBooking: async ({ bookingAPI }, use) => {
    const createBooking = async (data: any) => {
      return await bookingAPI.createBooking(data);
    };

    await use(createBooking);
  },
});
export{expect};
