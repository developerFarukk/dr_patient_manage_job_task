import { Appointment } from '../appointment/appointment.model'
import { Doctor } from '../doctor/doctor.model'
import { Patient } from '../patient/patient.model'

// get all doctor service
const adminDashboardDataFromDB = async () => {
  // find Doctor
  const doctorData = await Doctor.find()
  const totalDoctors = doctorData?.length

  // find Doctor
  const patientData = await Patient.find()
  const totalPatient = patientData?.length


  // find Apoinment
  const apoinmentData = await Appointment.find()
  const totalApoinment = apoinmentData?.length

  return {
    'Total Doctors': totalDoctors,
    'Total Patient': totalPatient,
    'Total Apoinment': totalApoinment
  }
}

export const AdminServices = {
  adminDashboardDataFromDB,
}
