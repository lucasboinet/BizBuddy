import { UpdateCompanySettings } from "@/actions/users/UpdateCompanySettings";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCompanySettingsSchema, UpdateCompanySettingsSchemaType } from "@/schema/settings";
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

export default function CompanySettings({ settings }: { settings: AppSettings | null }) {
  const form = useForm<UpdateCompanySettingsSchemaType>({
    resolver: zodResolver(updateCompanySettingsSchema),
    defaultValues: {
      address: settings?.address ?? defaultAddress,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateCompanySettings,
    onSuccess: () => {
      toast.success('Company updated', { id: "company-settings-update" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "company-settings-update" });
    },
  });

  const onSubmit = useCallback((values: UpdateCompanySettingsSchemaType) => {
    toast.loading("Updating company...", { id: "company-settings-update" });
    mutate(values);
  }, [mutate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 mt-10">
        <div className="flex flex-col gap-6">
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

        <div className="flex mt-3">
          <Button type="submit" disabled={isPending}>
            {!isPending && "Save"}
            {isPending && <Loader2Icon className='animate-spin' />}
          </Button>
        </div>
      </form>
    </Form>
  )
}