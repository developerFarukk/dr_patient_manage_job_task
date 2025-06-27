/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { TPatient } from '../patient/patient.interface'
import { TUser } from './user.interface'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status';

// Patient  Creat Function
const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TPatient
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //Patient Password set
  userData.password = password

  //set Patient role
  userData.role = 'patient'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (file) {
      const imageName = `${userData._id}${userData?.name}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create Patient
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // create a admin (transaction-2)
    const newPatient = await Patient.create([payload], { session })

    if (!newPatient.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create patient')
    }

    await session.commitTransaction()
    await session.endSession()

    return newPatient
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const UserServices = {
  createAdminIntoDB,
}
