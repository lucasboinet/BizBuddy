import { Customer } from "@prisma/client";
import { UserAddress } from "./auth";

export interface AppCustomer extends Customer {
  address: UserAddress,
}