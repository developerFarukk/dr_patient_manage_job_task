import { Types } from 'mongoose'

export type SetDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type TAvailability = {
  doctor: Types.ObjectId
  service: Types.ObjectId
  day: SetDay
  slots: {
    startTime: string
    endTime: string
    maxPatients?: number
    isAvailable?: boolean
  }[]
  isAvailable?: boolean
}
