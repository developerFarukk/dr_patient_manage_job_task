


import { z } from 'zod';

export const doctorServiceValidationSchema = z.object({
  title: z
    .string({
      required_error: 'Service title is required',
    })
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title can not be more than 100 characters')
    .trim(),

  description: z
    .string({
      required_error: 'Service description is required',
    })
    .min(3, 'Description must be at least 3 characters')
    .trim(),

  price: z
    .number({
      required_error: 'Service price is required',
      invalid_type_error: 'Price must be a number',
    })
    .min(0, 'Price cannot be negative'),

  duration: z
    .number({
      required_error: 'Service duration is required',
      invalid_type_error: 'Duration must be a number',
    })
    .min(5, 'Minimum duration is 5 minutes'),

  doctor: z
    .string({
      required_error: 'Doctor ID is required',
    })
    .min(1, 'Doctor ID cannot be empty'),
});


export const doctorServiceValidation = {
  doctorServiceValidationSchema,
}