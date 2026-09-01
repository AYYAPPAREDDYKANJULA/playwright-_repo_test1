import { APIRequestContext, expect } from "@playwright/test";

export class AuthAPI {
  constructor(private request: APIRequestContext) {}
  async createToken(
    username = "admin",
    password = "password123",
  ): Promise<string> {
    const response = await this.request.post("/auth", {
      data: {
        username,
        password,
      },
    });
    expect(response.status()).toBe(200);
    const authBody = await response.json();
    expect(authBody.token).toBeTruthy();
    return authBody.token;
  }
}
