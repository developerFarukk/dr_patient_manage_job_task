import { z } from 'zod'

// Patient validation schema
export const createDoctorValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must be less than 20 characters' }),
    doctor: z.object({
      name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' })
        .max(40, { message: 'Name must be less than 40 characters' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Please provide a valid email address.' }),
      phone: z
        .string()
        .min(11, { message: 'Number must be at least 11 characters long.' })
        .max(15, { message: 'Number must be at least 15 characters long.' }),
      gender: z.enum(['male', 'female', 'other']).optional(),
      specialization: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),

      hospitalName: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),

      hospitalFloor: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' }),
    }),
  }),
})


const apoinmentStatusrValidationSchema = z.object({
  body: z.object({
    status: z.enum(['accepted', 'cancelled'], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be either "accepted" or "cancelled"',
    }),
  }),
})

export const doctorValidation = {
  createDoctorValidationSchema,
  apoinmentStatusrValidationSchema,
}
