import express from 'express'
import { AdminControllers } from './admin.controler'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'



const router = express.Router()


// total doctor get Route
router.get(
  '/dashboard',
  auth(USER_ROLE.admin),
  AdminControllers.adminDashboard
)



export const AdminRoutes = router