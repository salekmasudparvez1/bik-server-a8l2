import { z } from "zod";


export const CreateCustomerSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name can not be more than 50 characters" }),
        email: z.string({ message: "Invalid email" }).min(1, { message: "Email is required" }),
        phone: z.string().min(3, { message: "Phone is required" }).max(50, { message: "Phone can not be more than 50 characters" })

    }).strict()
})
export const fetchCustomerByIdSchema = z.object({
    params: z.object({
        id: z.string("Id is required").min(3, { message: "id not found" }),
    })
});
export const deleteCustomerByIdSchema =fetchCustomerByIdSchema;



export const updateCustomerByIdSchema = z.object({
    params: z.object({
        id: z.string().min(3, { message: "Id not found" }),
    }),
    body: z
        .object({
            name: z
                .string()
                .min(1, { message: "Name is required" })
                .max(50, { message: "Name can not be more than 50 characters" })
                .optional(),

            phone: z
                .string()
                .min(3, { message: "Phone is required" })
                .max(50, { message: "Phone can not be more than 50 characters" })
                .optional(),
        })
        .strict()
        .refine(
            (data) => {
                // Returns true if AT LEAST one is defined
                return data.name !== undefined || data.phone !== undefined;
            },
            {
                message: "At least one field (name or email) must be provided",
                path: ["body"],
            }
        ),
});