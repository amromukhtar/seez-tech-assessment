import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

import { Car } from '../models/index';

export const queryCars = catchAsync(async (req) => {
  const cars = await APIFeatures(req, Car);

  if (!cars) {
    return {
      status: 'error',
      message: 'noCarsFound',
      statusCode: 404
    };
  }

  return {
    status: 'success',
    message: 'successfulCarsFound',
    statusCode: 200,
    cars
  };
});

export const createCar = catchAsync(async (req) => {
  const { name, make, model, mileage, year, price, color } = req.body;

  if (!name || !make || !model || !mileage || !year || !price) {
    return {
      status: 'error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  const car = await Car.create({
    name,
    make,
    model,
    mileage,
    year,
    price,
    color
  });

  return {
    status: 'success',
    message: 'successfulCarCreate',
    statusCode: 201,
    car
  };
});
