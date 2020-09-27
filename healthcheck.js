const express = require('express');

const logger = require('./log');

const PORT = 5000;
const app = express();
app.use('/healthcheck', require('express-healthcheck')());
app.use(function (req, res) {
  res.redirect('https://trombs.com');
});

app.listen(PORT, () => {
  logger.info(`Health check service running on port ${PORT}.`);
});
