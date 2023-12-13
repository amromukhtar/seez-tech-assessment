import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import createLocaleMiddleware from 'express-locale';

import config from './config/config';
import { successHandle, errorHandle } from './config/morgan';

import limiter from './middlewares/rateLimiter';

import errorHandler from './utils/errorHandler';
import AppError from './utils/appError';
import startPolyglot from './utils/startPolyglot';

import routes from './routes';

const app = express();

app.use(successHandle);

app.use(errorHandle);

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(helmet());

app.use(
  createLocaleMiddleware({
    priority: ['accept-language', 'default'],
    default: 'en_US'
  })
);

app.use(startPolyglot);

app.use(xss());

app.use(mongoSanitize());

app.use(cors());
app.options('*', cors());

app.use(compression());

app.disable('x-powered-by');

if (config.env === 'production') {
  app.use('/api', limiter);
}

app.use('/api', routes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
