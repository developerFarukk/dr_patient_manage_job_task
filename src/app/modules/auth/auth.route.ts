
import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { createPatientValidationSchema } from '../patient/patient.validation';
import { AuthControllers } from './auth.controller';
import { createDoctorValidationSchema } from '../doctor/doctor.validation';



const router = express.Router();

// Patient Creat Route
router.post(
  '/register-patient',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createPatientValidationSchema),
  AuthControllers.createPatient,
);


// Doctor registation Route
router.post(
  '/register-doctor',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createDoctorValidationSchema),
  AuthControllers.createDoctor,
);


export const AuthRoutes = router;




