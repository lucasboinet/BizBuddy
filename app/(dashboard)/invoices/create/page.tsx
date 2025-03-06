import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { GetCustomers } from "@/actions/customers/GetUserCustomers";
import CreateInvoiceForm from "../_components/create-invoice-form";

export default function CreateInvoicePage() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<InvoiceSkeleton />}>
          <CreateInvoice />
        </Suspense>
      </div>
    </div>
  );
}

function InvoiceSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-11 w-full' />
    </div>
  );
}

async function CreateInvoice() {
  const customers = await GetCustomers();

  return (
    <div className="h-full">
      <CreateInvoiceForm
        customers={customers}
      />
    </div>
  )
}