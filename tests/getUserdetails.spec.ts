import { expect, request, test } from '@playwright/test'

test('getuserdetails', async ({ request }) => {
    const responce = await request.get("https://jsonplaceholder.typicode.com/users");
    
    const responseBody = await responce.json();
    console.log(responseBody);
    expect(responce.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBe(10);
})