import fs from "fs";
import { parse } from "csv-parse/sync";

export type BookingData = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  checkin: string;
  checkout: string;
  additionalneeds: string;
};

export function readBookingCSV(filePath: string): BookingData[] {
  const csvData = fs.readFileSync(filePath, "utf-8");

  return parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }).map((row: any): BookingData => ({
    firstname: row.firstname,
    lastname: row.lastname,
    totalprice: Number(row.totalprice),
    depositpaid: row.depositpaid === "true",
    checkin: row.checkin,
    checkout: row.checkout,
    additionalneeds: row.additionalneeds,
  }));
}