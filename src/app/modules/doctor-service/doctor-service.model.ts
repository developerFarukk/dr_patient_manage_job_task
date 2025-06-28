import { model, Schema } from "mongoose";
import { TService } from "./doctor-service.interface";



const doctorServiceSchema = new Schema<TService>({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
    minlength: [3, 'Title can not be more than 3 characters'],
    maxlength: [100, 'Name can not be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    minlength: [3, 'Description can not be more than 3 characters'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required'],
    min: [5, 'Minimum duration is 5 minutes'],
    trim: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
}, {
  timestamps: true,
});

export const Service = model<TService>('Service', doctorServiceSchema);