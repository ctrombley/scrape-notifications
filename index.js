const cron = require('node-cron');
const newrelic = require('newrelic');
const logger = require('./log');

config = require('./config');
notifications = require('./notifications');
Scraper = require('./scraper');

logger.info('Starting scrape server.');
scraper = new Scraper(config);

process.on('SIGINT', function () {
  logger.info('Caught interrupt signal, exiting.');
  process.exit();
});

cron.schedule(config.schedule, () => {
  newrelic.startBackgroundTransaction('scrape');

  logger.info('Running scrape job.');
  scraper
    .scrape()
    .then((output) => {
      if (!output.length) {
        return;
      }

      logger.info('Scrape completed.', {
        output: output,
      });

      notifications.send(output.join('\n'));
    })
    .catch((err) => {
      logger.error(err);
    })
    .finally(() => {
      newrelic.endTransaction();
    });
});
