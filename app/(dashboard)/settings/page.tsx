import { GetSettings } from "@/actions/users/GetSettings";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import SettingsTabs from "./_components/settings-tabs";
import { GetMe } from "@/actions/auth/GetMe";

export default function AccountSettingsPage() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<AccountSettingsSkeleton />}>
          <AccountSettings />
        </Suspense>
      </div>
    </div>
  );
}

function AccountSettingsSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-11 w-full' />
    </div>
  );
}

async function AccountSettings() {
  const [settings, user] = await Promise.all([
    GetSettings(),
    GetMe()
  ]);

  return (
    <div>
      <SettingsTabs user={user} settings={settings} />
    </div>
  )
}