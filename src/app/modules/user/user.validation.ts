import { z } from 'zod'
import { UserStatus } from './user.constant'

// User Validation
const userValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(40, { message: 'Name must be less than 40 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
  number: z
    .string()
    .min(11, { message: 'Number must be at least 11 characters long.' })
    .max(15, { message: 'Number must be at least 15 characters long.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Please provide a valid email address.' }),
})

// User Status Validation
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
})

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
}
