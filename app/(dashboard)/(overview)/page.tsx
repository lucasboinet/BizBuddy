import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import DashboardPage from "./_components/dashboard-page";
import { GetDashboardStats } from "@/actions/GetDashboardStats";

export default function DashboardPageLoader() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='space-y-2'>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className='h-32 w-full' />
      ))}
    </div>
  );
}

async function Dashboard() {
  const stats = await GetDashboardStats();

  return (
    <div>
      <DashboardPage stats={stats} />
    </div>
  )
}