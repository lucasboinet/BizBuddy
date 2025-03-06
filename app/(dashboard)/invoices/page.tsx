import { GetInvoices } from "@/actions/invoices/GetInvoices";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import { InvoicesTable } from "./_components/invoices-table/invoices-table";
import { columns } from "./_components/invoices-table/columns";
import { CreateInvoiceModal } from "./_components/create-invoice-modal";
import { GetCustomers } from "@/actions/customers/GetUserCustomers";

export default function InvoicesPage() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<InvoicesSkeleton />}>
          <Invoices />
        </Suspense>
      </div>
    </div>
  );
}

function InvoicesSkeleton() {
  return (
    <div className='space-y-2'>
      {Array(10).fill(0).map((i) => (
        <Skeleton key={i} className='h-11 w-full' />
      ))}
    </div>
  );
}

async function Invoices() {
  const [invoices, customers] = await Promise.all([
    GetInvoices(),
    GetCustomers()
  ]);

  if (!invoices) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong, please try again later</AlertDescription>
      </Alert>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className='flex flex-col gap-4 h-full items-center'>
        {JSON.stringify(invoices)}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateInvoiceModal customers={customers} />
      </div>
      <InvoicesTable
        data={invoices}
        columns={columns}
      />
    </div>
  )
}