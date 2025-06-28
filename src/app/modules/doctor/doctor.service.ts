import AppError from '../../errors/AppError'
import { TService } from '../doctor-service/doctor-service.interface'
// import { Service } from "../doctor-service/doctor-service.model"
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { Service } from '../doctor-service/doctor-service.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { ServiceSearchableFields } from './doctor.constant'

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
  const doctorServiceQuery = new QueryBuilder(
    Service.find(),
      // .populate('doctor'),
    query
  )
    .search(ServiceSearchableFields)
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


// Update Service Data
const updateServiceIntoDB = async (
    id: string,
    payload: Partial<TService>,
) => {
  
    const result = await Service.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    
    return result;
};


export const DoctorServices = {
  createDoctorServiceIntoDB,
  getAllDoctorServiceFromDB,
  updateServiceIntoDB
}
