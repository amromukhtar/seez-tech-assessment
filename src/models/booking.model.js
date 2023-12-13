import mongoose from 'mongoose';
import toJSON from './plugins/index';

const bookingSchema = mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.ObjectId,
      ref: 'Car',
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    status : {
      type: String,
      required: true,
      default:"Booked"
    },
    from: {
      type: Date,
      required: true
    },
    to: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.plugin(toJSON);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
