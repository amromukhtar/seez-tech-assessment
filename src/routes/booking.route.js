import express from 'express';

import { bookingController } from '../controllers/index';

import protect from '../middlewares/protect';

const {
  getAvailableCars,
  getBookings,
  createBooking,
  cancelBooking
} = bookingController;

const router = express.Router();

router.use(protect);

router.get('/cars', getAvailableCars);

router.get('/', getBookings);

router.post('/', createBooking);

router.put('/', cancelBooking);

export default router;
