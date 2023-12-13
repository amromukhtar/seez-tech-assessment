import express from 'express';

import { carController } from '../controllers/index';

import protect from '../middlewares/protect';
import restrictedTo from '../middlewares/restrictedTo';

const { getCars, createCar } = carController;

const router = express.Router();

router.use(protect);

router.get('/', getCars);

router.use(restrictedTo('superuser'));

router.post('/', createCar);

export default router;
