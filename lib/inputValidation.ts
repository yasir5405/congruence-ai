import { z } from "zod";

export const registerInputSchema = z.object({
  name: z
    .string({ error: "Name is required." })
    .min(2, { error: "Name should be at least 2 characters long." })
    .max(100, { error: "Name should be less than 100 characters long." }),
  email: z.email({ error: "Email is required." }),
  password: z
    .string({ error: "Password is required." })
    .min(8, { error: "Password should be atleast 8 characters long." })
    .max(100, { error: "Password should be less than 100 characters long." }),
});

export const loginInputSchema = z.object({
  email: z.email({ error: "Email is required." }),
  password: z
    .string({ error: "Password is required." })
    .min(8, { error: "Password should be at least 8 characters long." })
    .max(100, { error: "Password should be less than 100 characters long." }),
});

export type registerInput = z.infer<typeof registerInputSchema>;
export type loginInput = z.infer<typeof loginInputSchema>;
