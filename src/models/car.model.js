import mongoose from 'mongoose';
import toJSON from './plugins/index';

const carSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter car name']
    },
    make: {
      type: String,
      required: [true, 'Please enter car maker']
    },
    model: {
      type: String,
      required: [true, 'Please enter car name']
    },
    mileage: {
      type: Number,
      required: [true, 'Please enter car mileage']
    },
    year: {
      type: Number,
      required: [true, 'Please enter car year']
    },
    price: {
      type: Number,
      required: [true, 'Please enter car price']
    },
    color: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

carSchema.plugin(toJSON);

const Car = mongoose.model('Car', carSchema);

export default Car;
