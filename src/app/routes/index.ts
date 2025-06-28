

import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DoctorRoutes } from "../modules/doctor/doctor.route";


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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;