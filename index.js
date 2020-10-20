const cron = require('node-cron');

const logger = require('./log');
const config = require('./config');
const Scraper = require('./scraper');
const run = require('./runner');

logger.info('Starting scrape server.');
const scraper = new Scraper(config);

const express = require('express');
const PORT = 5000;
const app = express();

app.use('/healthcheck', require('express-healthcheck')());
app.use('/scrape', function (req, res) {
  run(scraper);
  res.sendStatus(200);
});
app.use(function (req, res) {
  res.redirect('https://trombs.com');
});

app.listen(PORT, () => {
  logger.info(`Health check service running on port ${PORT}.`);
});

process.on('SIGINT', function () {
  logger.info('Caught interrupt signal, exiting.');
  process.exit();
});

cron.schedule(config.schedule, () => {
  run(scraper);
});
