import { GetCustomer } from "@/actions/customers/GetCustomer";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CustomerDetailPage from "./_components/customer-detail-page";
import CustomerDetailsPage from "./_components/customer-details-page";
import { endOfYear, getYear, startOfYear } from "date-fns";
import { GetCustomerYearlyRevenue } from "@/actions/customers/GetCustomerYearlyRevenue";

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
  const currentYearRange = { start: startOfYear(new Date()), end: endOfYear(new Date()) };
  const [customer, revenue] = await Promise.all([
    GetCustomer(customerId),
    GetCustomerYearlyRevenue(customerId, currentYearRange)
  ]);

  if (!customer) {
    redirect('/customers');
  }

  return (
    <div className="h-full">
      <CustomerDetailsPage customer={customer} revenue={revenue} />
    </div>
  )
}