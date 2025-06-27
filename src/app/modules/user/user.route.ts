import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { createPatientValidationSchema } from '../patient/patient.validation';


const router = express.Router();

// Patient Creat Route
router.post(
  '/create-patient',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createPatientValidationSchema),
  UserControllers.createPatient,
);


export const UserRoutes = router;




