import {expect, request, test} from "@playwright/test";

test('putresuest', async({request})=>{
    const responce=await request.put('https://jsonplaceholder.typicode.com/users/1',{
        data:
        {
            username :'Ayyappa',
            email : "test@gmail.com"
            
        }
    })
    const responcebody=await responce.json();
    console.log(responcebody)
    console.log('status code',responce.status());
    expect(responce.status()).toBe(200)
})