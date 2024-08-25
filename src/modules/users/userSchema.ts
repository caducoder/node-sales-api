import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().uuid(),
    password: z.string(),
  }),
});

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email(),
      old_password: z.string().optional(),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.password && !data.old_password) {
          return false;
        }
        return true;
      },
      {
        message: "old_password is required when password is present",
        path: ["old_password"],
      }
    ),
});
