import { Customer, Project } from "@prisma/client";

export enum PROJECT_STATUS {
  CREATED = 'CREATED',
  WAITING_FOR_QUOTATION_SIGNATURE = 'WAITING_FOR_QUOTATION_SIGNATURE',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
  COMPLETED = 'COMPLETED',
}

export interface AppProject extends Project {
  customer?: Customer,
}