import { Model, Types } from "mongoose";


// Patient interface
export type TPatient = {
    _id?: string;
    user: Types.ObjectId;
    gender: 'male' | 'female' | 'other';
    age: number
    profileImg?: string;
};


export interface PatientModel extends Model<TPatient> {
    isUserExists(_id: string): Promise<TPatient | null>;
}