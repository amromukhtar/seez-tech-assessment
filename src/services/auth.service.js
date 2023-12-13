import tokenTypes from '../config/tokens';
import catchAsync from '../utils/catchAsync';

import {generateAuthTokens} from '../middlewares/token';
 
import { User, Token } from '../models/index';

export const signup = catchAsync(async (req) => {
  
  let { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return {
      status: 'error',
      message: 'fieldsRequired',
      statusCode: 400
    };
  }

  if (password.length < 8) {
    return {
      status: 'error',
      message: 'passwordLength',
      statusCode: 400
    };
  }

  if (!role) role = 'user';

  if (!['superuser', 'user'].includes(role)) {
    return {
      status: 'error',
      message: 'roleRestriction',
      statusCode: 400
    };
  }

  const isEmailTaken = await User.isEmailTaken(email);

  if (isEmailTaken) {
    return {
      status: 'error',
      message: 'emailTaken',
      statusCode: 409
    };
  }

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  user.password = undefined;

  return {
    status: 'success',
    statusCode: 201,
    message: 'successfulSignUp',
    user
  };
});

export const signin = catchAsync(async (req) => {
  
  const { email, password } = req.body;

  if (!email || !password) {
    return {
      statusCode: 400,
      message: 'emailPasswordRequired'
    };
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return {
      status: 'error',
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  const isMatch = await user.isPasswordMatch(password);

  if (!isMatch) {
    return {
      status: 'error',
      statusCode: 401,
      message: 'incorrectEmailOrPassword'
    };
  }

  await Token.deleteMany({ user: user._id });

  const tokens = await generateAuthTokens(user);

  return {
    status: 'success',
    statusCode: 200,
    message: 'successfulLogin',
    tokens
  };
});

export const logout = catchAsync(async (refreshToken) => {
  const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

  if (!refreshTokenDoc) {
    return {
      status: 'error',
      statusCode: 401,
      message: 'loginAgain'
    };
  }

  await Token.deleteMany({
    user: refreshTokenDoc.user,
    status: tokenTypes.REFRESH
  });

  return {
    status: 'success',
    statusCode: 200,
    message: 'successfullogout'
  };
});

export const refreshAuth = catchAsync(async (refreshToken) => {
  const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

  if (!refreshTokenDoc) {
    return {
      status: 'error',
      statusCode: 404,
      message: 'No token found.'
    };
  }

  const user = await User.findById(refreshTokenDoc.user);

  if (!user) {
    return {
      status: 'error',
      statusCode: 404,
      message: 'noUserFound'
    };
  }

  const tokens = await generateAuthTokens(user);

  return {
    status: 'success',
    statusCode: 200,
    message: 'successfulTokenGeneration',
    tokens
  };
});
