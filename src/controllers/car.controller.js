import catchAsync from '../utils/catchAsync';
import { carService } from '../services/index';

export const getCars = catchAsync(async (req, res) => {

  const { status, message, statusCode, cars } = await carService.queryCars(req);

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

export const createCar = catchAsync(async (req, res) => {
  const { status, message, statusCode, car } = await carService.createCar(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    car
  });
});

