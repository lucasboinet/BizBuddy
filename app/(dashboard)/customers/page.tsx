import { GetUserCustomers } from "@/actions/customers/GetUserCustomers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Customer } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

export default function Customers() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<UserCustomersSkeleton />}>
          <UserCustomers />
        </Suspense>
      </div>
    </div>
  );
}

function UserCustomersSkeleton() {
  return (
    <div className='space-y-2'>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className='h-32 w-full' />
      ))}
    </div>
  );
}

async function UserCustomers() {
  const customers = await GetUserCustomers();

  if (!customers) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong, please try again later</AlertDescription>
      </Alert>
    )
  }

  if (customers.length === 0) {
    return (
      <div className='flex flex-col gap-4 h-full items-center'>
        {JSON.stringify(customers)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols 1 gap-4">
      {customers.map((customer: Customer) => (
        <p key={customer.id}>{JSON.stringify(customer)}</p>
      ))}
    </div>
  )
}