import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
  }),
});

export const getProductSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
