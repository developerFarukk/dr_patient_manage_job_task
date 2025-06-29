
import { z } from 'zod';

// create apoinment validation schema
export const createAppointmentSchema = z.object({
  body: z.object({
    doctor: z.string(),
    service: z.string(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Time must be in "HH:MM" 24-hour format',
    }),
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'Time must be in "HH:MM" 24-hour format',
    }),
  }),
});

export const AppointmentValidation = {
  createAppointmentSchema,
};