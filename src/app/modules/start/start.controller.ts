import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { startService } from "./start.service";
import httpStatus from 'http-status';



const startServer = catchAsync(async (req, res) => {

    const result = await startService.startIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Server start succesfully',
        data: result,
    });
});




export const startControllers = {
    startServer
};