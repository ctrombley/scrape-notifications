const cron = require('node-cron');

logger = require('./log');
config = require('./config');
notifications = require('./notifications');
Scraper = require('./scraper');

logger.info('Starting scrape server.');
scraper = new Scraper(config);
cron.schedule(config.schedule, () => {
  console.log('Running scrape job.');
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
    });
});
