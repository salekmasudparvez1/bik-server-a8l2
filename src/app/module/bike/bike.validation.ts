import { z } from "zod";

export const createBikeSchema = z.object({
  body: z.object({
    brand: z
      .string()
      .min(1, { message: "Brand is required" })
      .max(50, { message: "Brand can not be more than 50 characters" }),
    model: z
      .string()
      .min(1, { message: "Model is required" })
      .max(50, { message: "Model can not be more than 50 characters" }),
    year: z
      .number()
      .min(1900, { message: "Year must be a valid year" })
      .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
    customerId: z
      .string()
      .min(3, { message: "Customer ID is required" })
  }).strict()
});
export const fetchBikeByIdSchema = z.object({
  params: z.object({
    id: z.string("Id is required").min(3, { message: "id not found" }),
  })
});
