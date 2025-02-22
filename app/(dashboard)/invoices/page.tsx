import { GetUserInvoices } from "@/actions/invoices/GetUserInvoices";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Invoice } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

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
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className='h-32 w-full' />
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

  if (invoices.length === 0) {
    return (
      <div className='flex flex-col gap-4 h-full items-center'>
        {JSON.stringify(invoices)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols 1 gap-4">
      {invoices.map((invoice: Invoice) => (
        <p key={invoice.id}>{JSON.stringify(invoice)}</p>
      ))}
    </div>
  )
}