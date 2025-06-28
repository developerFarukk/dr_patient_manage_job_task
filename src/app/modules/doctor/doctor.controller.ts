import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { DoctorServices } from "./doctor.service"
import httpStatus from 'http-status'


// Patient Create Funtionality
const createService = catchAsync(async (req, res) => {
  const {  patient: patientData } = req.body

  const result = await DoctorServices.createDoctorServiceIntoDB(
    patientData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is created succesfully',
    data: result,
  })
})


export const DocorControllers = {
  createService,
}