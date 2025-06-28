import express from 'express'
import { UserControllers } from './user.controler'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from './user.constant'

const router = express.Router()



// all Avilability get Route
router.get(
  '/',
//   auth(USER_ROLE.admin, USER_ROLE.doctor, USER_ROLE.patient),
  UserControllers.getAllDoctors
)


export const userRoutes = router