import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});
