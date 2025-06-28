
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { doctorServiceValidationSchema } from '../doctor-service/doctor-service.validation';
import { DocorControllers } from './doctor.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();


// Service Creat Route
router.post(
  '/service',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  validateRequest(doctorServiceValidationSchema),
  DocorControllers.createService,
);

// all service get Route
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.doctor, USER_ROLE.patient),
  DocorControllers.getAlleService,
);


// Update service get Route
router.patch(
  '/service/:id',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  DocorControllers.updateService,
);


export const DoctorRoutes = router;