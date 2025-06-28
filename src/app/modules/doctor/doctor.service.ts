import AppError from '../../errors/AppError'
import { TService } from '../doctor-service/doctor-service.interface'
// import { Service } from "../doctor-service/doctor-service.model"
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { Service } from '../doctor-service/doctor-service.model'
import QueryBuilder from '../../builder/QueryBuilder'

// CREATE DOCTOR SERVICE
const createDoctorServiceIntoDB = async (
  userEmail: string,
  payload: Omit<TService, 'doctor'>
) => {
  // Check User exixtse
  const user = await User.isUserExistsById(userEmail)
  const userId = user?._id

  if (!userId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user id is not found !!!')
  }

  const serviceData = {
    ...payload,
    doctor: userId,
  }

  const service = await Service.create(serviceData)

  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create service')
  }

  return service
}

// get all doctor service
const getAllDoctorServiceFromDB = async (query: Record<string, unknown>) => {

  const doctorServiceQuery = new QueryBuilder(Bicycle.find(), query)
    .search(BicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await doctorServiceQuery.countTotal()
  const result = await doctorServiceQuery.modelQuery

  return {
    meta,
    result,
  }
}

export const DoctorServices = {
  createDoctorServiceIntoDB,
  getAllDoctorServiceFromDB
}
