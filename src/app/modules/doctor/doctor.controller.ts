import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { DoctorServices } from "./doctor.service"
import httpStatus from 'http-status'


// Service Create Funtionality
const createService = catchAsync(async (req, res) => {
  
  const { userEmail } = req.user;
 
  const result = await DoctorServices.createDoctorServiceIntoDB(
    userEmail,
    req.body
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