import { GetInvoice } from "@/actions/invoices/GetInvoice";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import UpdateInvoiceForm from "../_components/update-invoice-form";

export default function InvoicePage({ params }: { params: { invoiceId: string} }) {
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
  const invoice = await GetInvoice(invoiceId);

  if (!invoice) {
    toast.error("Can't find the invoice you are searching for")
    redirect('/invoices');
  }
  
  return (
    <div>
      <UpdateInvoiceForm invoice={invoice} />
    </div>
  )
}