import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Availability } from '../availability/availability.model'
import { Doctor } from '../doctor/doctor.model'
import { DoctorSearchableFields } from './user.constant'
import httpStatus from 'http-status'

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

// Single doctor Data
const getSingleDoctorIdIntoDB = async (id: string) => {
  // Check service exixtse
  const doctorInfo = await Doctor.findOne({ user: id })

  if (!doctorInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'This doctor id is not found !!!')
  }

  const availabilityInfo = await Availability.find({
    doctor: new mongoose.Types.ObjectId(id),
  })
    .populate('service')
    // .populate({
    //   path: 'doctor',
    //   model: 'User',
    //   select: ' email status',
    // })

  if (availabilityInfo.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No availability found for doctor')
  }

  return {
    doctorInfo,
    availabilityInfo,
  }
}

export const UserServices = {
  getAllDoctorFromDB,
  getSingleDoctorIdIntoDB,
}
