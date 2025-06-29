import express from 'express'
import { UserControllers } from './user.controler'

const router = express.Router()



// all Avilability get Route
router.get(
  '/',
//   auth(USER_ROLE.admin, USER_ROLE.doctor, USER_ROLE.patient),
  UserControllers.getAllDoctors
)


// Single Doctor get Route
router.get(
  '/:id',
//   auth(USER_ROLE.admin, USER_ROLE.doctor),
  UserControllers.getSingleDoctors
)


export const userRoutes = router