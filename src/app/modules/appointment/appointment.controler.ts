

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ApoinmentServices } from './appointment.service';


// Create apoinment
const createAppointment = catchAsync(async (req: Request, res: Response) => {

    const { userEmail } = req.user
    
  const result = await ApoinmentServices.bookAppointmentIntoDB(userEmail, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Appointment booked successfully',
    data: result,
  });
});

export const AppointmentController = {
  createAppointment,
};