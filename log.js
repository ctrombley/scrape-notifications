const { createLogger, format, transports } = require('winston');

config = require('./config');

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'scrape-notifications' },
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'scrape-notifications-error.log',
      level: 'error',
    }),
    new transports.File({ filename: 'scrape-notifications-combined.log' }),
  ],
});

module.exports = logger;
