import { Document, Types } from 'mongoose'

export type TAppointmentStatus =
  | 'pending'
  | 'accepted'
  | 'cancelled'
  | 'completed'

export interface TAppointment extends Document {
  doctor: Types.ObjectId
  patient: Types.ObjectId
  service: Types.ObjectId
  date: Date
  startTime: string
  endTime: string
  status: TAppointmentStatus
}
