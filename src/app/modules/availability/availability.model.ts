

import { Schema, model } from 'mongoose';
import { TAvailability } from './availability.interface';

const availabilitySchema = new Schema<TAvailability>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    slots: [
      {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        maxPatients: { type: Number, default: 1 },
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Availability = model<TAvailability>('Availability', availabilitySchema);