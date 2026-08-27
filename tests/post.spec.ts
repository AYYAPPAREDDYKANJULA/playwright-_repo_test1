import { test, request, expect } from "@playwright/test";

test('post request', async ({ request }) => {

    const senddata= {
    "username" : "admin",
    "password" : "password123"
}
    const responce = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: { 'Content-Type': 'application/json' },data:senddata
    });
    console.log(await responce.status());
    const tokdata=await responce.json();
    expect(tokdata.token).not.toBeNull();
});