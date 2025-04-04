import { CreateInvoiceModal } from "@/app/(dashboard)/invoices/_components/create-invoice-modal";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AppCustomer } from "@/types/customers";
import { INVOICE_STATUS } from "@/types/invoices";
import { AppProject } from "@/types/projects";
import { format } from "date-fns";
import { FileText, MoreHorizontal, Receipt } from "lucide-react";
import { useMemo } from "react";

interface Props {
  project: AppProject;
}

export default function ProjectTabFinancials({ project }: Props) {
  const financials = useMemo(() => [...project.invoices], [project.invoices]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Quotations & Invoices</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            New Quotation
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {financials.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <FileText
                  className={`h-5 w-5 ${item.id.startsWith('INV') ? "text-green-500" : "text-blue-500"}`}
                />
                <div>
                  <p className="font-medium">{item.id}</p>
                  <p className="text-sm text-muted-foreground capitalize">{item.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    item.status === INVOICE_STATUS.PAID ? "default" : item.status === INVOICE_STATUS.SENT ? "outline" : "secondary"
                  }
                >
                  {item.status === INVOICE_STATUS.PAID ? "Paid" : item.status === INVOICE_STATUS.SENT ? "Pending" : "Approved"}
                </Badge>
                <div className="text-sm">
                  <p className="font-medium">${item.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{format(item.dueDate, 'dd/MM/yyyy')}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download PDF</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {financials.length === 0 && (
            <EmptyState
              icon={Receipt}
              title="No financial records"
              description="Create quotations and invoices to track project finances"
            >
              <CreateInvoiceModal
                selectedCustomer={project.customer as AppCustomer}
                selectedProject={project as AppProject}
              >
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Quotation
                </Button>
              </CreateInvoiceModal>
            </EmptyState>
          )}
        </div>
      </CardContent>
    </Card>
  )
}