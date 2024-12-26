import { z } from "zod";

const ItemDto = z.object({
  qt: z.string().default("0"), // Quantity, defaulting to 0
  invoice: z.object({
    refrence: z.string().uuid(), // Reference to the invoice (refrence is UUID)
  }), // The related invoice (a reference)
});
export type SignUpDto = z.infer<typeof ItemDto>;
