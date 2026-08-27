import { expect, test } from "@playwright/test";

test('createuser', async ({ request }) => {
    const responce = await request.post("https://jsonplaceholder.typicode.com/users", {
        data:
        {
            name: 'Ayyappa',
            email: "test@gmail.com"
        }
    });
    const responcebody = await responce.json();
    console.log(responcebody);
    expect(responce.status()).toBe(201);
})