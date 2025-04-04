import { Project } from "@prisma/client";
import { AppBoard } from "./board";
import { AppInvoice } from "./invoices";
import { AppTag } from "./tags";
import { AppCustomer } from "./customers";

export enum PROJECT_STATUS {
  CREATED = 'CREATED',
  WAITING_FOR_QUOTATION_SIGNATURE = 'WAITING_FOR_QUOTATION_SIGNATURE',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
  COMPLETED = 'COMPLETED',
}

export interface AppProject extends Project {
  customer: AppCustomer,
  status: PROJECT_STATUS,
  board?: AppBoard,
  tags: AppTag[],
  invoices: AppInvoice[],
}

export const projectStatusLabels: Record<PROJECT_STATUS, string> = {
  CREATED: 'Created',
  IN_PROGRESS: 'In Progress',
  WAITING_FOR_APPROVAL: 'Waiting for Approval',
  WAITING_FOR_QUOTATION_SIGNATURE: 'Waiting for Quotation Signature',
  COMPLETED: 'Completed',
}