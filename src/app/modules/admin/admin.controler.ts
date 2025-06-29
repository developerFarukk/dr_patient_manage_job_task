import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { AdminServices } from './admin.service'

// all doctor Service data
const adminDashboard = catchAsync(async (req, res) => {

  const result = await AdminServices.adminDashboardDataFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard data get succesfully',
    data: result,
  })
})


export const AdminControllers = {
  adminDashboard,
  
}