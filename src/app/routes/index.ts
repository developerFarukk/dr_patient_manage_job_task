

import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";
import { userRoutes } from "../modules/user/user.route";
import { AppointmentRoutes } from "../modules/appointment/appointment.router";


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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;