import { z } from "zod";

export const createBikeServiceSchema = z.object({
    body: z.object({
        bikeId: z.string().uuid(),
        serviceDate: z.string().refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid date format"
        }),
        description: z.string().min(1, { message: "Description is required" }),
        completionDate: z.string().optional(),
        status: z.enum(["PENDING", "IN_PROGRESS", "DONE"])
    }).strict()
});



export const addCompletionDateSchema = z.object({
    params: z.object({
        id: z.string().uuid({ message: "Invalid service ID format" }),
    }),
    body: z.object({
        completionDate: z.string().datetime({ message: "Date need in iso formate" }).optional(),
    }).strict(),
});
// {
//   "completionDate": "2025-04-11T15:30:00.000Z"
// }