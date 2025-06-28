/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import { TPatient } from '../patient/patient.interface'
import { TUser } from '../user/user.interface'
import AppError from '../../errors/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { Patient } from '../patient/patient.model'
import { User } from '../user/user.model'
import { TDoctor } from '../doctor/doctor.interface'
import { Doctor } from '../doctor/doctor.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
import { createToken } from './auth.utils'


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


// Doctor  Creat Function
const createDoctortIntoDB = async (
  file: any,
  password: string,
  payload: TDoctor
) => {
  const userData: Partial<TUser> = {
    password,
    role: 'doctor',
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
    const newDoctor = await Doctor.create([payload], { session })

    if (!newDoctor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Doctor')
    }

    await session.commitTransaction()
    await session.endSession()

    return newDoctor
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
  }
}


// LogIn User Function
const loginUser = async (payload: TLoginUser) => {

    // Check User exixtse
    const user = await User.isUserExistsById(payload.email);

    // console.log(isUserExists);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user email is not found !!!');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');


    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );


    return {
        accessToken,
    };

};

export const AuthServices = {
  createPatientIntoDB,
  createDoctortIntoDB,
  loginUser
}
