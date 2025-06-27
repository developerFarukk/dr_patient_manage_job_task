import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';


// Student Create Funtionality
const createPatient = catchAsync(async (req, res) => {
    const { password, patient: patientData } = req.body;

    const result = await UserServices.createPatientIntoDB(
        req.file,
        password,
        patientData,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Patient is created succesfully',
        data: result,
    });
});



export const UserControllers = {
    createPatient,

};