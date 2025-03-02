'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import AccountSettings from "./account-settings";
import { AppSettings } from "@/types/settings";
import { AuthSafeUser } from "@/types/auth";

export default function SettingsTabs({ user, settings }: { user: AuthSafeUser, settings: AppSettings | null }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'account';

  return (
    <Tabs defaultValue={tab} className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountSettings user={user} settings={settings} />
      </TabsContent>
      <TabsContent value="billing">Change your billing settings here.</TabsContent>
    </Tabs>
  )
}