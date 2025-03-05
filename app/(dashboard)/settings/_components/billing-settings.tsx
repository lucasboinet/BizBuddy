import { UpdateBillingSettings } from "@/actions/users/UpdateBillingSettings";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateBillingSettingsSchema, UpdateBillingSettingsSchemaType } from "@/schema/settings";
import { AppSettings } from "@/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


export default function BillingSettings({ settings }: { settings: AppSettings | null }) {
  const form = useForm<UpdateBillingSettingsSchemaType>({
    resolver: zodResolver(updateBillingSettingsSchema),
    defaultValues: {
      bic: settings?.bic ?? '',
      iban: settings?.iban ?? '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateBillingSettings,
    onSuccess: () => {
      toast.success('Billing settings updated', { id: "billing-settings-update" });
    },
    onError: (error: any) => {
      toast.error(error.message, { id: "billing-settings-update" });
    },
  });

  const onSubmit = useCallback((values: UpdateBillingSettingsSchemaType) => {
    toast.loading("Updating billing settings...", { id: "billing-settings-update" });
    mutate(values);
  }, [mutate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 mt-10">
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name='bic'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex gap-1 items-center'>
                  BIC
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
            name='iban'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex gap-1 items-center'>
                  IBAN
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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