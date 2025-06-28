

import { Model, Types } from 'mongoose'

// Patient interface
export type TDoctor = {
  _id?: string
  user: Types.ObjectId
  name: string
  email: string
  phone: string
  gender?: 'male' | 'female' | 'other'
  specialization: string
  hospitalName: string
  hospitalFloor: string

  profileImg?: string
}

export interface DoctorModel extends Model<TDoctor> {
  isUserExists(id: string): Promise<TDoctor | null>
}