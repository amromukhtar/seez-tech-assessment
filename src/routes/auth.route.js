import express from 'express';

import { authController } from '../controllers/index';

const {
  signin,
  signup,
  logout,
  refreshTokens
} = authController;

const router = express.Router();

router.post('/login', signin);

router.post('/register', signup);

router.post('/logout', logout);

router.post('/tokens', refreshTokens);

export default router;
