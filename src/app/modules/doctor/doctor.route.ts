
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { doctorServiceValidationSchema } from '../doctor-service/doctor-service.validation';
import { DocorControllers } from './doctor.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();


// Patient Creat Route
router.post(
  '/service',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  validateRequest(doctorServiceValidationSchema),
  DocorControllers.createService,
);


export const DoctorRoutes = router;