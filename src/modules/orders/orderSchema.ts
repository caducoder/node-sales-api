import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    customer_id: z.number(),
    products: z.array(
      z.object({
        id: z.string(),
        price: z.number(),
        quantity: z.number(),
      })
    ),
  }),
});

export const showOrderSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
