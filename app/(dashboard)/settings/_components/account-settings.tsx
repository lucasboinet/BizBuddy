import { UpdateAccountSettings } from "@/actions/users/UpdateAccountSettings";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateAccountSettingsSchema, UpdateAccountSettingsSchemaType } from "@/schema/settings";
import { AuthSafeUser } from "@/types/auth";
import { AppSettings } from "@/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultAddress = {
  line1: '',
  line2: '',
  postalCode: '',
  city: ''
}

export default function AccountSettings({ user, settings }: { user: AuthSafeUser, settings: AppSettings | null }) {
  const form = useForm<UpdateAccountSettingsSchemaType>({
    resolver: zodResolver(updateAccountSettingsSchema),
    defaultValues: {
      address: settings ? settings.address : defaultAddress,
      firstname: user.firstname,
      lastname: user.lastname
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateAccountSettings,
    onSuccess: () => {
      toast.success('Account updated', { id: "account-settings-update" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "account-settings-update" });
    },
  });

  const onSubmit = useCallback((values: UpdateAccountSettingsSchemaType) => {
    toast.loading("Updating account...", { id: "account-settings-update" });
    mutate(values);
  }, [mutate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-1">Profile</h3>
            <span className="text-secondary-foreground">Set your account details</span>
          </div>
          <div className="col-span-3 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Firstname {field.value}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Lastname
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="userEmail" className='flex gap-1 items-center'>
                Email
              </Label>
              <Input value={user?.email} id="userEmail" disabled />
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-1">Address</h3>
            <span className="text-secondary-foreground">Set your company address</span>
          </div>
          <div className="col-span-3 flex flex-col gap-6">
            <FormField
              control={form.control}
              name='address.line1'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Line 1
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address.line2'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex gap-1 items-center'>
                    Line 2
                    <span className="text-xs">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name='address.postalCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      Postal code
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address.city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex gap-1 items-center'>
                      City
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={isPending}>
            {!isPending && "Save"}
            {isPending && <Loader2Icon className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}