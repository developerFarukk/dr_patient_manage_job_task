import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AuthServices } from './auth.service'
import sendResponse from '../../utils/sendResponse'

// Student Create Funtionality
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

export const AuthControllers = {
  createPatient,
}
