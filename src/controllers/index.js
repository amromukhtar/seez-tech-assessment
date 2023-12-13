import { signin, signup, logout, refreshTokens } from './auth.controller';

import { getCars, createCar } from './car.controller';

import {
  getAvailableCars,
  getBookings,
  createBooking,
  cancelBooking
} from './booking.controller';

const authController = {
  signin,
  signup,
  logout,
  refreshTokens
};

const carController = {
  getCars,
  createCar
};

const bookingController = {
  getAvailableCars,
  getBookings,
  createBooking,
  cancelBooking
};

export { authController, bookingController, carController };
