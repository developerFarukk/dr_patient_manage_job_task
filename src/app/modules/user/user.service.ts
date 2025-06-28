import QueryBuilder from '../../builder/QueryBuilder'
import { Doctor } from '../doctor/doctor.model'
import { DoctorSearchableFields } from './user.constant'

// get all doctor service
const getAllDoctorFromDB = async (query: Record<string, unknown>) => {
  const doctorAllQuery = new QueryBuilder(
    Doctor.find(),
    // .populate('doctor'),
    query
  )
    .search(DoctorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await doctorAllQuery.countTotal()
  const result = await doctorAllQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const UserServices = {
  getAllDoctorFromDB,
}
