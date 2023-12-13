import express from 'express';

import authRoute from './auth.route';
import carRoute from './car.route';
import bookingRoute from './booking.route';

const router = express.Router();

router.use('/auth', authRoute);

router.use('/car', carRoute);

router.use('/booking', bookingRoute);

export default router;
