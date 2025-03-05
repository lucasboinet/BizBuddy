'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import AccountSettings from "./account-settings";
import { AppSettings } from "@/types/settings";
import { AuthSafeUser } from "@/types/auth";
import CompanySettings from "./company-settings";
import BillingSettings from "./billing-settings";

export default function SettingsTabs({ user, settings }: { user: AuthSafeUser, settings: AppSettings | null }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'account';

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2 mb-4">
        <h1 className="font-semibold text-2xl">Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      <Tabs defaultValue={tab} className="lg:max-w-[50%] w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings user={user} />
        </TabsContent>
        <TabsContent value="company">
          <CompanySettings settings={settings} />
        </TabsContent>
        <TabsContent value="billing">
          <BillingSettings settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}