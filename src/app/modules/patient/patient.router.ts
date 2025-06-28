import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { PatientControllers } from './patient.controler'


const router = express.Router()

// get All patient Apoinments
router.get(
  '/appointments',
  auth( USER_ROLE.patient),
  PatientControllers.studentApoinmentService
)


export const PatientRoutes = router
