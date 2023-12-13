import catchAsync from '../utils/catchAsync';
import { bookingService } from '../services/index';

export const getAvailableCars = catchAsync(async (req, res) => {

  const { status, message, statusCode, cars } = await bookingService.queryAvailableCars(
    req
  );

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }


  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    cars
  });
});

export const getBookings = catchAsync(async (req, res) => {

  const { status, message, statusCode, bookings } = await bookingService.queryBookings(
    req
  );

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }


  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    bookings
  });
});

export const createBooking = catchAsync(async (req, res) => {

  const { status, message, statusCode, booking } = await bookingService.createBooking(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    booking
  });
});


export const cancelBooking = catchAsync(async (req, res) => {

  const { status, message, statusCode } = await bookingService.cancelBooking(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message)
  });
});

