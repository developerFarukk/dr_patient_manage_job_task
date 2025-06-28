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


// Create Avilibity
const setAvailability = catchAsync(async (req, res) => {
  const { userEmail } = req.user;
  const result = await DoctorServices.setAvailabilityIntoDB(
    userEmail,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Availability set successfully',
    data: result,
  });
});


// all doctor Service data
const getAlleService = catchAsync(async (req, res) => {
  
 
  const result = await DoctorServices.getAllDoctorServiceFromDB( req.query  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service all data get succesfully',
    data: result,
  })
})


// Update doctor Service data
const deleteService = catchAsync(async (req, res) => {
  
 const { id } = req.params;
 
  const result = await DoctorServices.deleteServiceFromDB( id  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Service  succesfully',
    data: result,
  })
})


// Update doctor Service data
const updateService = catchAsync(async (req, res) => {
  
 const { id } = req.params;
 
  const result = await DoctorServices.updateServiceIntoDB( id, req.body  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Service  succesfully',
    data: result,
  })
})


export const DocorControllers = {
  createService,
  getAlleService,
  updateService,
  deleteService,
  setAvailability
}