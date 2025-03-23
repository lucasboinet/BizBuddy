import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppCustomer } from "@/types/customers";
import { INVOICE_STATUS } from "@/types/invoices";
import { format } from "date-fns";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  customer: AppCustomer;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
}

export default function InvoicesTab({ customer, totalRevenue, paidRevenue, pendingRevenue }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Invoices</h2>
          <p className="text-sm text-muted-foreground">
            {customer.invoices.length} invoices ({customer.invoices.filter((i) => i.status === INVOICE_STATUS.PAID).length} paid)
          </p>
        </div>
        <Button className="bg-green-300 hover:bg-green-400 text-green-900">
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <Card className="border-green-100">
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Invoiced</div>
              <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">{customer.invoices.length} invoices</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Paid</div>
              <div className="text-2xl font-bold text-green-600">${paidRevenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {customer.invoices.filter((i) => i.status === INVOICE_STATUS.PAID).length} invoices
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Outstanding</div>
              <div className="text-2xl font-bold text-yellow-600">${pendingRevenue.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {customer.invoices.filter((i) => i.status !== INVOICE_STATUS.PAID).length} invoices
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border border-green-100 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Invoice</TableHead>
              <TableHead className="min-w-[200px]">Project</TableHead>
              <TableHead className="min-w-[100px]">Amount</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[150px]">Issue Date</TableHead>
              <TableHead className="min-w-[150px]">Due Date</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customer.invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    className="font-medium hover:text-green-600 transition-colors"
                  >
                    {invoice.id}
                  </Link>
                </TableCell>
                <TableCell>
                  {invoice.name}
                </TableCell>
                <TableCell className="font-medium">${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  {invoice.status}
                </TableCell>
                <TableCell>{format(invoice.createdAt, "MMM d, yyyy")}</TableCell>
                <TableCell>{format(invoice.dueDate, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}