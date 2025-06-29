import AppError from '../../errors/AppError'
import { TService } from '../doctor-service/doctor-service.interface'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { Service } from '../doctor-service/doctor-service.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { ServiceSearchableFields } from './doctor.constant'
import { TAvailability } from '../availability/availability.interface'
import { Availability } from '../availability/availability.model'
import { Appointment } from '../appointment/appointment.model'
import { ApoinmentSearchableFields } from '../appointment/appoinment.constant'
import { TAppointment } from '../appointment/appointment.interface'

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

// Create Avilebility
const setAvailabilityIntoDB = async (
  userEmail: string,
  payload: TAvailability
) => {
  // Check User exists
  const user = await User.isUserExistsById(userEmail)
  const doctorId = user?._id

  if (!doctorId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found')
  }

  // Check if the service belongs to the doctor
  const serviceExists = await Service.findOne({
    _id: payload.service,
    doctor: doctorId,
  })

  if (!serviceExists) {
    throw new AppError(httpStatus.FORBIDDEN, 'Service does not belong to you')
  }

  // Check for overlapping slots on the same day
  const existingSlots = await Availability.find({
    doctor: doctorId,
    day: payload.day,
  })

  const hasOverlap = existingSlots.some((availability) => {
    return availability.slots.some((slot) => {
      return payload.slots.some((newSlot) => {
        return (
          new Date(`1970-01-01T${newSlot.startTime}`) <
            new Date(`1970-01-01T${slot.endTime}`) &&
          new Date(`1970-01-01T${newSlot.endTime}`) >
            new Date(`1970-01-01T${slot.startTime}`)
        )
      })
    })
  })

  if (hasOverlap) {
    throw new AppError(
      httpStatus.CONFLICT,
      'You already have overlapping time slots for this day'
    )
  }

  const availability = await Availability.create({
    ...payload,
    doctor: doctorId,
  })

  return availability
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

// get Doctor Avilability
const getDoctorAvailabilityFromDB = async (userEmail: string) => {
  // Check User exixtse
  const user = await User.isUserExistsById(userEmail)
  const doctorId = user?._id

  if (!doctorId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user id is not found !!!')
  }

  const availability = await Availability.find({ doctor: doctorId })
    .populate('service')
    .select('-__v')

  if (!availability.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No availability found')
  }

  return availability
}

// get Apoinment by doctor
const getDoctorAppointmentsIntoDB = async (
  userEmail: string,
  query: Record<string, unknown>
) => {
  // Check User exixtse
  const user = await User.isUserExistsById(userEmail)
  const doctorId = user?._id

  if (!doctorId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This doctor id is not found !!!')
  }

  const doctorApoinmentQuery = new QueryBuilder(
    Appointment.find({ doctor: doctorId })
      .populate('service')
      // .populate('patient'),
      .populate({
        path: 'patient',
        model: 'User',
        select: ' email status',
      }),

    query
  )
    .search(ApoinmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await doctorApoinmentQuery.countTotal()
  const result = await doctorApoinmentQuery.modelQuery

  return {
    meta,
    result,
  }
}

// Delete Service Data
const deleteServiceFromDB = async (id: string) => {
  // Check service exixtse
  const serviceId = await Service.findById(id)

  if (!serviceId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service id is not found !!!')
  }

  const result = await Service.findByIdAndDelete(id)
  return result
}

// Update Service Data
const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  // Check service exixtse
  const serviceId = await Service.findById(id)

  if (!serviceId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service id is not found !!!')
  }

  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

// Update Avilability
const updateAvailabilityIntoDB = async (
  id: string,
  payload: Partial<TAvailability>
) => {
  const serviceId = await Service.findById(payload?.service)

  if (!serviceId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service id is not found !!!')
  }

  const availability = await Availability.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  )

  if (!availability) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Availability not found or unauthorized'
    )
  }

  return availability
}

const updateAppointmentStatusIntoDB = async (
  id: string,
  userEmail: string,
  payload: Partial<TAppointment>
) => {
  // Check User exixtse
  const user = await User.isUserExistsById(userEmail)
  const doctorId = user?._id

  if (!doctorId) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user id is not found !!!')
  }

  const appointment = await Appointment.findOneAndUpdate(
    { _id: id, doctor: doctorId },
    payload,
    { new: true }
  )

  if (!appointment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Apoinmet not found or unauthorized'
    )
  }

  return appointment
}

export const DoctorServices = {
  createDoctorServiceIntoDB,
  getAllDoctorServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
  setAvailabilityIntoDB,
  updateAvailabilityIntoDB,
  getDoctorAvailabilityFromDB,
  getDoctorAppointmentsIntoDB,
  updateAppointmentStatusIntoDB,
}
