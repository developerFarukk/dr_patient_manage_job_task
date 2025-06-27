import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: string;
  name: string,
  email: string;
  phone: string,
  password: string;
  role: 'admin' | 'patient' | 'doctor' ;
  status: 'in-progress' | 'blocked';
};


export interface UserModel extends Model<TUser> {

  //instance methods for checking if the user exist
  isUserExistsByCustomId(_id: string): Promise<TUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

}


export type TUserRole = keyof typeof USER_ROLE;