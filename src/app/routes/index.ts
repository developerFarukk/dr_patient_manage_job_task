

import { Router } from "express";
import { StartRoutes } from "../modules/start/start.route";

const router = Router();

const moduleRoutes = [

    {
        path: '/start',
        route: StartRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;