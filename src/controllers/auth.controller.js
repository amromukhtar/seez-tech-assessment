import catchAsync from '../utils/catchAsync';

import { authService } from '../services';

export const signup = catchAsync(async (req, res) => {
  const { status, message, statusCode, user } = await authService.signup(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    user
  });
});

export const signin = catchAsync(async (req, res) => {

  const { status, message, statusCode, user, tokens } =
    await authService.signin(req);

  if (status === 'error') {
    return res.status(statusCode).json({
      status,
      message: req.polyglot.t(message)
    });
  }

  return res.status(statusCode).json({
    status,
    message: req.polyglot.t(message),
    user,
    tokens
  });
});

export const logout = catchAsync(async (req, res) => {
  const { status, message, statusCode } = await authService.logout(
    req.body.refreshToken
  );

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

export const refreshTokens = catchAsync(async (req, res) => {
  const { status, message, statusCode, tokens } = await authService.refreshAuth(
    req.body.refreshToken
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
    tokens
  });
});