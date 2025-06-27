
import express from 'express';
import { startControllers } from "./start.controller";




const router = express.Router();

router.get('/', startControllers.startServer);


export const StartRoutes = router;