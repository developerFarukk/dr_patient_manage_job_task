import { z } from "zod";


// Patient validation schema
export const createPatientValidationSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters' })
            .max(20, { message: 'Password must be less than 20 characters' }),
        patient: z.object({
            gender: z.enum(['male', 'female', 'other']),
            age: z.number()
        })
    })

});
