/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import AppError from '../../errors/AppError'
import { Availability } from '../availability/availability.model'
import httpStatus from 'http-status'
import { Appointment } from './appointment.model'
import { User } from '../user/user.model'
import { Doctor } from '../doctor/doctor.model'
import { Service } from '../doctor-service/doctor-service.model'
import emailSender from '../../utils/emailSender'
import { Patient } from '../patient/patient.model'

// Book Appointment
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
  const currentUser = await Patient.findOne({ user: patientId })

  if (!patientId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found')
  }

  // Check doctor exists
  const doctorInfo = await Doctor.findOne({ user: payload.doctor })
  if (!doctorInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found')
  }

  // Check service exists
  const serviceInfo = await Service.findOne({
    _id: payload.service,
    doctor: payload.doctor,
  })
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found')
  }

  // Convert date to Date object
  const appointmentDate = new Date(payload.date)
  if (isNaN(appointmentDate.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format')
  }

  // Get day name
  const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' })

  // Find availability slot
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
  })

  if (!availability) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Time slot not available')
  }

  // Find the slot object
  const slot = availability.slots.find(
    (s: any) =>
      s.startTime === payload.startTime && s.endTime === payload.endTime
  )

  if (!slot || !slot.maxPatients) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot not available')
  }

  // Count existing appointments for this slot
  const totalAppointments = await Appointment.countDocuments({
    doctor: payload.doctor,
    service: payload.service,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    status: { $nin: ['cancelled', 'rejected'] },
  })

  if (totalAppointments >= slot.maxPatients) {
    throw new AppError(httpStatus.CONFLICT, 'Slot capacity full')
  }

  // Check if this patient already booked same slot
  const existingPatientAppointment = await Appointment.findOne({
    doctor: payload.doctor,
    patient: patientId,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    status: { $nin: ['cancelled', 'rejected'] },
  })

  if (existingPatientAppointment) {
    throw new AppError(
      httpStatus.CONFLICT,
      'You have already booked this slot with this doctor'
    )
  }

  // Create appointment
  const appointment = await Appointment.create({
    doctor: payload.doctor,
    service: payload.service,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    patient: patientId,
    status: 'pending',
  })

  // Send email confirmation
  if (appointment) {
    try {
      const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Appointment Booked Successfully</h2>
          <p>Dear ${currentUser?.name},</p>
          <p>Your appointment has been booked with Dr. ${doctorInfo?.name} for:</p>
          <div style="background: #f7fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Service:</strong> ${serviceInfo.title}</p>
            <p><strong>Date:</strong> ${appointmentDate.toDateString()}</p>
            <p><strong>Time:</strong> ${payload.startTime} - ${payload.endTime}</p>
            <p><strong>Status:</strong> Pending (Waiting for doctor confirmation)</p>
          </div>
          <p>You will receive another email once the doctor confirms your appointment.</p>
          <p>Thank you for using our service!</p>
        </div>
      `
      const textContent = `
Appointment Booked Successfully
Dear ${currentUser?.name},
Your appointment has been booked with Dr. ${doctorInfo?.name} for:
Service: ${serviceInfo.title}
Date: ${appointmentDate.toDateString()}
Time: ${payload.startTime} - ${payload.endTime}
Status: Pending (Waiting for doctor confirmation)
Thank you for using our service!
      `
      await emailSender(
        userEmail,
        'Appointment Booked Successfully',
        textContent,
        htmlContent
      )
    } catch (error) {
      console.error('Email sending failed:', error)
    }
  }

  return {
    message: 'Appointment booked successfully! Check your email.',
    appointment,
  }
}

export const ApoinmentServices = {
  bookAppointmentIntoDB,
}
