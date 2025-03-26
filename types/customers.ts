import { Customer } from "@prisma/client";
import { UserAddress } from "./auth";
import { AppProject } from "./projects";
import { AppInvoice } from "./invoices";

export interface AppCustomer extends Customer {
  address: UserAddress,
  invoices?: AppInvoice[],
  projects?: AppProject[],
}

export type MonthAbbreviation = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export type MonthlyRevenue = {
  month: MonthAbbreviation;
  revenue: number;
};

export type YearlyRevenue = Array<MonthlyRevenue> & { length: 12 };