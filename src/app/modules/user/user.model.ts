import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    _id: {
      type: String,
      unique: true,
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
      required: true
    },
    password: {
      type: String,
      required: [true, 'Password id is required'],
      select: 0,
      trim: true
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
    // versionKey: false
  }
)



userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// Existing ID
userSchema.statics.isUserExistsById = async function (_id: string) {
    return await User.findOne({ _id }).select('+password');
};

// Password Matched
userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser, UserModel>('User', userSchema);
