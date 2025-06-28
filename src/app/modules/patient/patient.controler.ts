import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { PatientServices } from "./patient.service"
import httpStatus from 'http-status'



// all doctor Service data
const studentApoinmentService = catchAsync(async (req, res) => {

const { userEmail } = req.user

  const result = await PatientServices.getPatientAppointmentsFromDB( userEmail, req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Apointments retrieved successfully',
    data: result,
  })
})

export const PatientControllers = {
  studentApoinmentService
}