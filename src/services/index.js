import { signin, signup, logout, refreshAuth } from './auth.service';

import { queryCars, createCar } from './car.service';

import {
  queryAvailableCars,
  queryBookings,
  createBooking,
  cancelBooking
} from './booking.service';

const authService = {
  signin,
  signup,
  logout,
  refreshAuth
};

const carService = {
  queryCars,
  createCar
};

const bookingService = {
  queryAvailableCars,
  queryBookings,
  createBooking,
  cancelBooking
};

export { authService, bookingService, carService };
