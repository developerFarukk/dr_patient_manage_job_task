import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserServices } from "./user.service"
import httpStatus from 'http-status'



// all doctor Service data
const getAllDoctors = catchAsync(async (req, res) => {
  const result = await UserServices.getAllDoctorFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All doctor data get succesfully',
    data: result,
  })
})


export const UserControllers = {
  getAllDoctors,
}