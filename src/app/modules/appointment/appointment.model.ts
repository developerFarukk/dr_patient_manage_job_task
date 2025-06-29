import { Schema, model } from 'mongoose'
import { TAppointment } from './appointment.interface'

const appointmentSchema = new Schema<TAppointment>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'patient',
      required: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, 
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export const Appointment = model<TAppointment>('Appointment', appointmentSchema)
