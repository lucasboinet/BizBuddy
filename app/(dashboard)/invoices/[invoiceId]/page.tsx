import { GetInvoice } from "@/actions/invoices/GetInvoice";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UpdateInvoiceForm from "../_components/update-invoice-form";
import { GetCustomers } from "@/actions/customers/GetCustomers";

export default function InvoicePage({ params }: { params: { invoiceId: string } }) {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<InvoiceSkeleton />}>
          <InvoiceDetails invoiceId={params.invoiceId} />
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

async function InvoiceDetails({ invoiceId }: { invoiceId: string }) {
  const [invoice, customers] = await Promise.all([
    GetInvoice(invoiceId),
    GetCustomers()
  ]);


  if (!invoice) {
    redirect('/invoices');
  }

  return (
    <div className="h-full">
      <UpdateInvoiceForm
        invoice={invoice}
        customers={customers}
      />
    </div>
  )
}