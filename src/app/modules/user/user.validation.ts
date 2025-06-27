import { z } from 'zod'
import { UserStatus } from './user.constant'

// User Validation
const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
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
