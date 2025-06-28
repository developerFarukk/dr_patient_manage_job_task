import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


// Enum for User Roles
export enum UserRole {
    ADMIN = 'admin',
    PATIENT = 'patient',
    DOCTOR = 'doctor'
 }

export interface TUser {
  _id?: string
  password: string
  email: string
  role: UserRole 
  status: 'in-progress' | 'blocked'

};


export interface UserModel extends Model<TUser> {

  //instance methods for checking if the user exist
  isUserExistsById(email: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}


export type TUserRole = keyof typeof USER_ROLE;