import { GetCustomer } from "@/actions/customers/GetCustomer";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function CustomerPage({ params }: { params: { customerId: string } }) {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<CustomerSkeleton />}>
          <CustomerDetails customerId={params.customerId} />
        </Suspense>
      </div>
    </div>
  );
}

function CustomerSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-11 w-full' />
    </div>
  );
}

async function CustomerDetails({ customerId }: { customerId: string }) {
  const customer = await GetCustomer(customerId);


  if (!customer) {
    redirect('/customers');
  }

  return (
    <div className="h-full">
      <code>
        <pre>
          {JSON.stringify(customer, null, 2)}
        </pre>
      </code>
    </div>
  )
}