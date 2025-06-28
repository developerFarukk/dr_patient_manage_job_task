

import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AppointmentController } from './appointment.controler';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidation } from './appointment.validation';


const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.patient),
  validateRequest(AppointmentValidation.createAppointmentSchema),
  AppointmentController.createAppointment
);

export const AppointmentRoutes = router;