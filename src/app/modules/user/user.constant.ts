export type UserRole = 'patient' | 'admin' | 'doctor'
export const USER_ROLE = {
  patient: 'patient',
  doctor: 'doctor',
  admin: 'admin',
} as const

export const UserStatus = ['in-progress', 'blocked']

export const DoctorSearchableFields = [
  'name',
  'email',
  '_id',
  'phone',
  'gender',
  'specialization',
  'hospitalName',
  'hospitalFloor'
]
