const newrelic = require('newrelic');
const notifications = require('./notifications');
const logger = require('./log');

const run = (scraper) => {
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
};

module.exports = run;
