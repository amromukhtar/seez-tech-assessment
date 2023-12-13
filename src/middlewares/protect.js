import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import config from '../config/config';

import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

import { User } from '../models/index';

const protect = catchAsync(async (req, res, next) => {

  
  const authHeader = req.headers.authorization;
  const token = authHeader
 
  if (!token || token === null) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, config.jwt.secret);

  const currentUser = await User.findById(decoded.sub);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again!', 401)
    );
  }

  req.user = currentUser;

  next();
});

export default protect;
