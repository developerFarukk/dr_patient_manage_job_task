/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import { TPatient } from '../patient/patient.interface'
import { TUser } from '../user/user.interface'
import AppError from '../../errors/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { Patient } from '../patient/patient.model'
import { User } from '../user/user.model'


// Patient  Creat Function
const createPatientIntoDB = async (
  file: any,
  password: string,
  payload: TPatient
) => {
  const userData: Partial<TUser> = {
    password,
    role: 'patient',
    email: payload.email,
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Create user
    const newUser = await User.create([userData], { session })
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // Assign user reference (with proper type)
    payload.user = newUser[0]._id as unknown as mongoose.Types.ObjectId

    if (file) {
      const imageName = `${newUser[0]._id}${payload?.name}`
      const path = file?.path
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // Create patient
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
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
  }
}

export const AuthServices = {
  createPatientIntoDB,
}
