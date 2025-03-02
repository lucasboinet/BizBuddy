import { Setting } from "@prisma/client";
import { UserAddress } from "./auth";

export interface AppSettings extends Setting {
  address: UserAddress,
}