import app from './app';
import logger from './config/logger';
import connectDB from './config/db';
import config from './config/config';

connectDB();

const serverPort = config.server.port;

const server = app.listen(serverPort, () => {
  logger.info(`
      ################################################
           API is listening on port: ${serverPort}
      ################################################
  `);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
