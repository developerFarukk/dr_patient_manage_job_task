import AppError from "../../errors/AppError"
import { TService } from "../doctor-service/doctor-service.interface"
import { Service } from "../doctor-service/doctor-service.model"
import httpStatus from 'http-status'



const createDoctorServiceIntoDB = async (
  doctorId: string,
  payload: Omit<TService, 'doctor'>
) => {
  
  const serviceData = {
    ...payload,
    doctor: doctorId,
  }

  const service = await Service.create(serviceData)

  if (!service) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create service')
  }

  return service
}



export const DoctorServices = {
  createDoctorServiceIntoDB,
};
