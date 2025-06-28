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


// Single doctor Service data
const getSingleDoctors = catchAsync(async (req, res) => {
    const { id } = req.params
  const result = await UserServices.getSingleDoctorIdIntoDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single doctor data get succesfully',
    data: result,
  })
})


export const UserControllers = {
  getAllDoctors,
  getSingleDoctors
}