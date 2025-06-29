

import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";
import { userRoutes } from "../modules/user/user.route";
import { AppointmentRoutes } from "../modules/appointment/appointment.router";
import { PatientRoutes } from "../modules/patient/patient.router";
import { AdminRoutes } from "../modules/admin/admin.route";


const router = Router();

const moduleRoutes = [

    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/doctor',
        route: DoctorRoutes,
    },
    {
        path: '/doctors',
        route: userRoutes,
    },
    {
        path: '/appointments',
        route: AppointmentRoutes,
    },
    {
        path: '/patient',
        route: PatientRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;