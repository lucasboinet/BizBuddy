import { z } from "zod";

export const updateAccountSettingsSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
})

export type UpdateAccountSettingsSchemaType = z.infer<typeof updateAccountSettingsSchema>;

export const updateCompanySettingsSchema = z.object({
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    postalCode: z.string().regex(/^\d+$/),
    city: z.string(),
  }),
})

export type UpdateCompanySettingsSchemaType = z.infer<typeof updateCompanySettingsSchema>;

export const updateBillingSettingsSchema = z.object({
  bic: z.string(),
  iban: z.string(),
})

export type UpdateBillingSettingsSchemaType = z.infer<typeof updateBillingSettingsSchema>;