import { model, Schema } from "mongoose";
import { DoctorModel, TDoctor } from "./doctor.interface";


const doctorSchema = new Schema<TDoctor, DoctorModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'user name is required'],
      trim: true,
      minlength: [3, 'Name can not be more than 3 characters'],
      maxlength: [40, 'Name can not be more than 40 characters'],
    },
    email: {
      type: String,
      required: [true, 'user Email is required'],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [15, 'Phone number can not be more than 15 characters'],
      minlength: [11, 'Phone number can not be more than 11 characters'],
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    specialization: {
      type: String,
      trim: true,
      required: [true, 'Specialization is required'],
      minlength: [3, 'Specialization can not be more than 3 characters'],
    },
    hospitalName: {
      type: String,
      trim: true,
      required: [true, 'Specialization is required'],
      minlength: [3, 'Specialization can not be more than 3 characters'],
    },
    hospitalFloor: {
      type: String,
      trim: true,
      required: [true, 'Specialization is required'],
      minlength: [3, 'Specialization can not be more than 3 characters'],
    },
    profileImg: { type: String, default: '' },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
    // versionKey: false
  }
)

export const Doctor = model<TDoctor, DoctorModel>('Doctor', doctorSchema)
