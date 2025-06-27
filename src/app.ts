/* eslint-disable @typescript-eslint/no-unused-vars */


import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import os from "os";
import { StatusCodes } from "http-status-codes";


const app: Application = express();

// middleware
app.use(express.json())
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// application routes
app.use('/api/v1', router);


// Conect Scerver medilwere
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    const currentDateTime = new Date().toISOString();
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const serverHostname = os.hostname();
    const serverPlatform = os.platform();
    const serverUptime = os.uptime();

    res.status(StatusCodes.OK).json({
        success: true,
        message: " Doctor Patient Appointment Management System",
        version: "1.0.0",
        clientDetails: {
            ipAddress: clientIp,
            accessedAt: currentDateTime,
        },
        serverDetails: {
            hostname: serverHostname,
            platform: serverPlatform,
            uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
                (serverUptime / 60) % 60
            )} minutes`,
        },
        developerContact: {
            email: "web.omarfaruk.dev@gmail.com",
            website: "developerfaruk.com",
        },
    });
});

// Global Error Handelar
app.use(globalErrorHandler);

//Not Found Page function
app.use(notFound);

export default app