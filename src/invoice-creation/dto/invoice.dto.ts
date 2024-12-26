import { z } from "zod";

export const invoiceDto = z.object({
  customer: z.string(),
  amount: z.number().default(0),
  items: z.array(
    z.object({
      sku: z.string().uuid(),
      qt: z.number().default(0),
    })
  ),
});

export type InvoiceDto = z.infer<typeof invoiceDto>;
