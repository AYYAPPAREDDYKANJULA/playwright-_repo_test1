import { faker } from "@faker-js/faker";
import fs from "fs";

const rows: string[] = [];

rows.push(
  "firstname,lastname,totalprice,depositpaid,checkin,checkout,additionalneeds"
);

for (let i = 0; i < 100; i++) {
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const totalprice = faker.number.int({
    min: 50,
    max: 1000
  });

  const depositpaid = faker.datatype.boolean();

  const checkin = "2026-10-01";
  const checkout = "2026-10-05";

  const additionalneeds = faker.helpers.arrayElement([
    "Breakfast",
    "Lunch",
    "Dinner",
    "None"
  ]);

  rows.push(
    `${firstname},${lastname},${totalprice},${depositpaid},${checkin},${checkout},${additionalneeds}`
  );
}

fs.writeFileSync(
  "test-data/bookingData.csv",
  rows.join("\n")
);

console.log("100 booking records generated.");