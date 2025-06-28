import { UserRole } from "../user/user.interface";



export type TLoginUser = {
    email: string;
    password: string;
};


export interface TJwtPayload {
    userEmail: string;
    role: UserRole;

}