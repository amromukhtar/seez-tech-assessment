import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

import { Booking, Car } from '../models/index';

export const queryAvailableCars = catchAsync(async (req) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return {
      status: 'error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const populateQuery = [
    { path: 'user', select: 'name email' },
    { path: 'car' }
  ];

  const bookedCars = await Booking.aggregate([
    {
      $match: {
        from: { $lte: new Date(to) },
        to: { $gte: new Date(from) }
      }
    },
    {
      $project: {
        _id: 0,
        car: '$car'
      }
    },
    {
      $group: {
        _id: null,
        cars: { $push: '$car' }
      }
    }
  ]);

  let bookedCarsList = [];
  if (bookedCars[0]) bookedCarsList = bookedCars[0].cars;

  const cars = await Car.find({
    _id: { $not: { $in: bookedCarsList } }
  });

  if (!cars) {
    return {
      status: 'error',
      message: 'noCarsFound',
      statusCode: 404
    };
  }

  return {
    status: 'success',
    message: 'successfulCarsAvailableFound',
    statusCode: 200,
    cars
  };
});

export const queryBookings = catchAsync(async (req) => {
  const populateQuery = [
    { path: 'user', select: 'name email' },
    { path: 'car' }
  ];
  const bookings = await APIFeatures(req, Booking, populateQuery);

  if (!bookings) {
    return {
      status: 'error',
      message: 'noBookingsFound',
      statusCode: 404
    };
  }

  return {
    status: 'success',
    message: 'successfulBookingsFound',
    statusCode: 200,
    bookings
  };
});

export const createBooking = catchAsync(async (req) => {
  const { user, car, from, to } = req.body;

  if (!user || !car || !from || !to) {
    return {
      status: 'error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  // Check if booked already
  const bookedCheck = await Booking.findOne({
    car,
    from: { $lte: new Date(to) },
    to: { $gte: new Date(from) }
  });

  if(bookedCheck){
    return {
      status: 'error',
      message: 'alreadyBooked',
      statusCode: 500
    };
  }

  const booking = await Booking.create({
    user,
    car,
    from: new Date(from),
    to: new Date(to),
    status: 'Booked'
  });

  return {
    status: 'success',
    message: 'successfulBookingCreate',
    statusCode: 201,
    booking
  };
});

export const cancelBooking = catchAsync(async (req) => {
  let booking = await Booking.findById(id);

  if (!booking) {
    return {
      status: 'error',
      message: 'noBookingFound',
      statusCode: 404
    };
  }

  booking.status = 'cancelled';
  await user.save();

  return {
    status: 'success',
    message: 'successfulUpdateBooking',
    statusCode: 200
  };
});
