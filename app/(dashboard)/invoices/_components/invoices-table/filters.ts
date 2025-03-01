import { capitalize } from "@/lib/helper/texts";
import { INVOICE_STATUS_KEYS } from "@/types/invoices";
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

export const filters: Filter[] = [
  {
    column: 'status',
    label: 'Status',
    options: () => INVOICE_STATUS_KEYS.map((key) => ({ label: capitalize(key), value: key })),
  },
  {
    column: 'customer_name',
    label: 'Customer',
    options: (values) => {
      return values?.map((value) => ({ label: value, value, })) as FilterOption[];
    },
  }
]