const cron = require('node-cron');
const newrelic = require('newrelic');

require('./healthcheck');
const logger = require('./log');
const config = require('./config');
const notifications = require('./notifications');
const Scraper = require('./scraper');

logger.info('Starting scrape server.');
const scraper = new Scraper(config);

process.on('SIGINT', function () {
  logger.info('Caught interrupt signal, exiting.');
  process.exit();
});

cron.schedule(config.schedule, () => {
  newrelic.startBackgroundTransaction('scrape', () => {
    const transaction = newrelic.getTransaction();
    logger.info('Running scrape job.');
    scraper
      .scrape()
      .then((output) => {
        logger.info('Scrape completed.', {
          output: output,
        });

        if (!output.length) {
          logger.info('No results found.');
          return;
        }

        logger.info(
          `${output.length} results found. Sending push notification.`,
        );
        notifications.send(output.join('\n'));
      })
      .catch((err) => {
        logger.error(err);
      })
      .finally(() => {
        transaction.end();
      });
  });
});
