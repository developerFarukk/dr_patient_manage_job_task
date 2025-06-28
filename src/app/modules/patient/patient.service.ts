import QueryBuilder from "../../builder/QueryBuilder";
import { Appointment } from "../appointment/appointment.model";
import { ApoinmentSearchableFields } from "./patient.const";
import { Patient } from "./patient.model";



const getPatientAppointmentsFromDB = async (userEmail: string, query: Record<string, unknown>) => {

const patient = await Patient.findOne({email: userEmail})
const patientId = patient?.user


const patientApoinmentQuery = new QueryBuilder(
    Appointment.find({patient: patientId})
    // .populate('doctor')
    .populate('service'),
    // .populate('doctor'),

    query
  )
    .search(ApoinmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await patientApoinmentQuery.countTotal()
  const result = await patientApoinmentQuery.modelQuery

  return {
    meta,
    result,
  }
};


export const PatientServices = {
  getPatientAppointmentsFromDB,

}