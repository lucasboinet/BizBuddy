import { Invoice } from "@prisma/client";
import { AppProject } from "./projects";

export enum INVOICE_STATUS {
  CREATED = 'CREATED',
  SENT = 'SENT',
  PAID = 'PAID',
  REFUSED = 'REFUSED',
}

export const INVOICE_STATUS_KEYS = Object.keys(INVOICE_STATUS) as Array<keyof typeof INVOICE_STATUS>;

export type InvoiceItem = {
  label: string,
  quantity: number,
  amount: number,
}

export interface AppInvoice extends Invoice {
  project?: AppProject;
  status: INVOICE_STATUS;
  items: InvoiceItem[];
}