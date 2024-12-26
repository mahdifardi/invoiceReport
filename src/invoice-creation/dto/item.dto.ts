import { z } from "zod";

const ItemDto = z.object({
  qt: z.string().default("0"),
  invoice: z.object({
    refrence: z.string().uuid(),
  }),
});
export type SignUpDto = z.infer<typeof ItemDto>;
