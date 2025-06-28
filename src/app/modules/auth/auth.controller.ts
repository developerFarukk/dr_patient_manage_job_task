import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AuthServices } from './auth.service'
import sendResponse from '../../utils/sendResponse'

// Patient Create Funtionality
const createPatient = catchAsync(async (req, res) => {
  const { password, patient: patientData } = req.body

  const result = await AuthServices.createPatientIntoDB(
    req.file,
    password,
    patientData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient is created succesfully',
    data: result,
  })
})


// Doctor Create Funtionality
const createDoctor = catchAsync(async (req, res) => {
  const { password, doctor: doctorData } = req.body

  const result = await AuthServices.createDoctortIntoDB(
    req.file,
    password,
    doctorData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor is created succesfully',
    data: result,
  })
})

export const AuthControllers = {
  createPatient,
  createDoctor
}
