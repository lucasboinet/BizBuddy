import { GetUserInvoices } from "@/actions/invoices/GetUserInvoices";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { Invoice } from "@prisma/client";
import { INVOICE_STATUS } from "@/types/invoices";
import { InvoicesTable } from "./_components/invoices-table/invoices-table";
import { columns } from "./_components/invoices-table/columns";

export default function Invoices() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<UserInvoicesSkeleton />}>
          <UserInvoices />
        </Suspense>
      </div>
    </div>
  );
}

function UserInvoicesSkeleton() {
  return (
    <div className='space-y-2'>
      {Array(10).fill(0).map((i) => (
        <Skeleton key={i} className='h-11 w-full' />
      ))}
    </div>
  );
}

async function UserInvoices() {
  const invoices = await GetUserInvoices();

  if (!invoices) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong, please try again later</AlertDescription>
      </Alert>
    )
  }

  // if (invoices.length === 0) {
  //   return (
  //     <div className='flex flex-col gap-4 h-full items-center'>
  //       {JSON.stringify(invoices)}
  //     </div>
  //   )
  // }

  const data: Invoice[] = [
    {
      projectId: "dasdpaspdojapdojaspod",
      id: "INV-132",
      name: "Create ERP app",
      status: INVOICE_STATUS.CREATED,
      amount: 300.78,
      items: [],
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      projectId: "dasdpaspdojapdojaspsd",
      id: "INV-131",
      name: "Add AI enhancement to dashboard",
      status: INVOICE_STATUS.PAID,
      amount: 330.78,
      items: [],
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]

  return (
    <div className="grid grid-cols 1 gap-4">
      <InvoicesTable data={data} columns={columns} />
    </div>
  )
}