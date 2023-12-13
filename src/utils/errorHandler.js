import AppError from './appError';

import config from '../config/config';
import logger from '../config/logger';

const handleJWTError = () =>
  new AppError('Invalid token, Please login again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again!', 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const dupField = Object.keys(err.keyValue)[0];
  const message = `Duplicate field(${dupField}). Please use another value(${err.keyValue[dupField]})!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = async (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: `${err.message}`,
    stack: err.stack
  });

const sendErrorProd = async (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: `${err.message}`
    });
  }

 
  logger.error('ERROR 💥', err);
  return res.status(500).json({
    status: 'error',
    message: `Something went wrong!`
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    sendErrorDev(err, req, res);

  } else if (config.env === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
