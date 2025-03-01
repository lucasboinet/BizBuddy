import { Customer } from "@prisma/client";

export type CustomerAddress = {
  line1: string,
  line2?: string,
  postalCode: number,
  city: string,
}

export interface AppCustomer extends Customer {
  address: CustomerAddress,
}