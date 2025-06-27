import { Model, Types } from 'mongoose'

// Patient interface
export type TPatient = {
  _id?: string
  user: Types.ObjectId
  name: string
  email: string
  phone: string
  gender: 'male' | 'female' | 'other'
  age: number
  profileImg?: string
}

export interface PatientModel extends Model<TPatient> {
  isUserExists(id: string): Promise<TPatient | null>
}
