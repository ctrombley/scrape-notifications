axios = require('axios');

function send(message) {
  const req = axios
    .post('https://api.pushed.co/1/push', {
      app_key: process.env.PUSHED_APP_KEY,
      app_secret: process.env.PUSHED_APP_SECRET,
      target_type: 'app',
      content: message,
    })
    .then((res) => {
      //console.debug(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

exports.send = send;
