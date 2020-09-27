axios = require('axios');

logger = require('./log');

function send(message) {
  const req = axios
    .post('https://api.pushed.co/1/push', {
      app_key: process.env.PUSHED_APP_KEY,
      app_secret: process.env.PUSHED_APP_SECRET,
      target_type: 'app',
      content: message,
    })
    .then((res) => {
      logger.debug('Received response from pushed.co', { res: res });
    })
    .catch((err) => {
      throw new Error(err);
    });
}

exports.send = send;
