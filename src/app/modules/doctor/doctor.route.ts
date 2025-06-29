import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { doctorServiceValidationSchema } from '../doctor-service/doctor-service.validation'
import { DocorControllers } from './doctor.controller'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'
import { doctorValidation } from './doctor.validation'


const router = express.Router()

// Service Creat Route
router.post(
  '/services',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  validateRequest(doctorServiceValidationSchema),
  DocorControllers.createService
)

// Create Avilabity route
router.post('/avilability', auth(USER_ROLE.doctor, USER_ROLE.admin), DocorControllers.setAvailability)

// all service get Route
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.doctor, USER_ROLE.patient),
  DocorControllers.getAlleService
)


// all Avilability get Route
router.get(
  '/avilability',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  DocorControllers.getDoctorAvailability
)

// View all doctor appointment
router.get(
  '/appointments',
  auth(USER_ROLE.doctor, USER_ROLE.admin),
  DocorControllers.getAllDoctorsApoinment
);

// delete service get Route
router.delete(
  '/services/:id',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  DocorControllers.deleteService
)

// Update service get Route
router.patch(
  '/services/:id',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  DocorControllers.updateService
)

// Update Avilability get Route
router.patch(
  '/avilability/:id',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  DocorControllers.updateAvailability
)

// Update apoinment status get Route
router.patch(
  '/appointments/:id/status',
  auth(USER_ROLE.admin, USER_ROLE.doctor),
  validateRequest(doctorValidation.apoinmentStatusrValidationSchema),
  DocorControllers.updateApoinment
)

export const DoctorRoutes = router
