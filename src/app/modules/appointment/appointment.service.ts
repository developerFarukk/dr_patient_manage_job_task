import AppError from '../../errors/AppError'
import { Availability } from '../availability/availability.model'
import httpStatus from 'http-status'
import { Appointment } from './appointment.model'
import { User } from '../user/user.model'
import { Doctor } from '../doctor/doctor.model'
import { Service } from '../doctor-service/doctor-service.model'



// Book Apoinment
const bookAppointmentIntoDB = async (
  userEmail: string,
  payload: {
    doctor: string
    service: string
    date: string | Date
    startTime: string
    endTime: string
  }
) => {
  // Check User exists
  const user = await User.isUserExistsById(userEmail)
  const patientId = user?._id

  if (!patientId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found')
  }

  // Check doctor exists
  const doctorInfo = await Doctor.findOne({ user: payload.doctor })
  if (!doctorInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found')
  }

  // Check service exists and belongs to the doctor
  const serviceInfo = await Service.findOne({
    _id: payload.service,
    doctor: payload.doctor,
  })
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found')
  }

  // Convert date to Date object if it's a string
  const appointmentDate = new Date(payload.date)
  if (isNaN(appointmentDate.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format')
  }

  // Get day name
  const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' })

  const availability = await Availability.findOne({
    doctor: payload.doctor,
    service: payload.service,
    day,
    slots: {
      $elemMatch: {
        startTime: payload.startTime, 
        endTime: payload.endTime,
      },
    },
    isAvailable: true,
  })

  // console.log(availability);

  if (!availability) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Time slot not available')
  }

  // Check for existing appointment
  const existingAppointment = await Appointment.findOne({
    doctor: payload.doctor,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    status: { $nin: ['cancelled', 'rejected'] },
  })

  if (existingAppointment) {
    throw new AppError(httpStatus.CONFLICT, 'Slot already booked')
  }

  // Create appointment with pending status
  const appointment = await Appointment.create({
    doctor: payload.doctor,
    service: payload.service,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    patient: patientId,
    status: 'pending', // Initial status
  })

  // Temporarily block the slot (will be confirmed or freed based on doctor's action)
  await Availability.updateOne(
    {
      _id: availability._id,
      'slots.startTime': payload.startTime,
      'slots.endTime': payload.endTime,
    },
    { $set: { 'slots.$.isAvailable': false } }
  )

  return appointment
}

export const ApoinmentServices = {
  bookAppointmentIntoDB,
}
