import {test,expect, request} from "@playwright/test";

test ('User Delete',async({request})=>{
    const responce= await request.delete("https://jsonplaceholder.typicode.com/users/4");
    const responcedata=await responce.json();
    console.log(responcedata);
    expect(responce.status()).toBe(200);
})