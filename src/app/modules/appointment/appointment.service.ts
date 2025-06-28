import AppError from '../../errors/AppError'
import { Availability } from '../availability/availability.model'
import httpStatus from 'http-status'
import { Appointment } from './appointment.model'
import { User } from '../user/user.model'
import { Doctor } from '../doctor/doctor.model'
import { Service } from '../doctor-service/doctor-service.model'

const bookAppointmentIntoDB = async (
  userEmail: string,
  payload: {
    doctor: string;
    service: string;
    date: string | Date; // Accept both string and Date
    startTime: string;
    endTime: string;
  }
) => {
  // Check User exists
  const user = await User.isUserExistsById(userEmail);
  const patientId = user?._id;

  if (!patientId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }

  // Check doctor exists
  const doctorInfo = await Doctor.findOne({ user: payload.doctor });
  if (!doctorInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found');
  }

  // Check service exists and belongs to the doctor
  const serviceInfo = await Service.findOne({
    _id: payload.service,
    doctor: payload.doctor,
  });
  if (!serviceInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Convert date to Date object if it's a string
  const appointmentDate = new Date(payload.date);
  if (isNaN(appointmentDate.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format');
  }

  // Get day name (e.g., "Monday")
  const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });

  // Check slot availability
  const availability = await Availability.findOne({
    doctor: payload.doctor,
    service: payload.service,
    day,
    'slots.startTime': payload.startTime,
    'slots.endTime': payload.endTime,
    'slots.isAvailable': true,
  });

  if (!availability) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Time slot not available');
  }

  // Check for existing appointment
  const existingAppointment = await Appointment.findOne({
    doctor: payload.doctor,
    date: appointmentDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    status: { $ne: 'cancelled' }, // Ignore cancelled appointments
  });

  if (existingAppointment) {
    throw new AppError(httpStatus.CONFLICT, 'Slot already booked');
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
  });

  // Block the slot
  await Availability.updateOne(
    {
      _id: availability._id,
      'slots.startTime': payload.startTime,
      'slots.endTime': payload.endTime,
    },
    { $set: { 'slots.$.isAvailable': false } }
  );

  return appointment;
};

export const ApoinmentServices = {
  bookAppointmentIntoDB,
}
