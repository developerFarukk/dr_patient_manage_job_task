import { model, Schema } from 'mongoose'
import { PatientModel, TPatient } from './patient.interface'

const studentSchema = new Schema<TPatient, PatientModel>(
  {
    _id: {
      type: String,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      }, // many or type value inpute use is enum
      required: [true, 'Gender is required'],
    },
    age: {
      type: Number,
      trim: true,
      required: [ true, 'age is required'],
      minlength: [0, 'Please inpute valid age']
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


export const Student = model<TPatient, PatientModel>('Patient', studentSchema);