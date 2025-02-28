"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { toast } from "sonner"
import Link from "next/link"
import { AppInvoice, InvoiceItem } from "@/types/invoices"

export const columns: ColumnDef<AppInvoice>[] = [
  {
    accessorKey: "id",
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("id")}</span>
    )
  }, 
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="hover:underline">{row.getValue('name')}</span>
      )
    }
  },
  {
    accessorKey: "project.customer.name",
    filterFn: 'arrIncludesSome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <Link 
          href={`/customers/${invoice.project?.customer?.id}`} 
          className="border rounded-md px-3 py-1 bg-gray-100 text-gray-700 hover:underline hover:cursor-pointer"
        >
          {row.getValue('project_customer_name')}
        </Link>
      )
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
 
      return <span>{formatted}</span>
    },
  },
  {
    accessorKey: "status",
    filterFn: 'arrIncludesSome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items: InvoiceItem[] = row.getValue('items');
      return <span className="border rounded-md px-2 bg-gray-100 text-gray-700">{items.length}</span>
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(invoice.name)
                toast.success("Copied to clipboard")
              }}
            >
              Copy invoice name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
            >
              <Link href={`/customers/${invoice.project?.customer?.id}`}>View customer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
            >
              <Link href={`/projects/${invoice.projectId}`}>View project</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" disabled>Archive invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
