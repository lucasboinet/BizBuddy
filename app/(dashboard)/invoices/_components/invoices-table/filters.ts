import { capitalize } from "@/lib/helper/texts";
import { INVOICE_STATUS } from "@/types/invoices"
import { LucideIcon } from "lucide-react";

export type FilterOption = {
  label: string,
  value: string,
  icon?: LucideIcon
}

export type Filter = {
  column: string,
  label: string,
  options: (values?: any[]) => FilterOption[],
}

const invoiceStatusKeys = Object.keys(INVOICE_STATUS) as Array<keyof typeof INVOICE_STATUS>;

export const filters: Filter[] = [
  {
    column: 'status',
    label: 'Status',
    options: () => invoiceStatusKeys.map((key) => ({ label: capitalize(key), value: key })),
  },
  {
    column: 'projectId',
    label: 'Project',
    options: (values) => {
      return values?.map((value) => ({ label: value, value, })) as FilterOption[];
    },
  }
]