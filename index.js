const YAML = require('yaml');
const fs = require('fs');

notifications = require('./notifications');
Scraper = require('./scraper.js');

const file = fs.readFileSync('./config.yaml', 'utf8');
const config = YAML.parse(file);

scraper = new Scraper(config);
scraper.scrape().then((output) => {
  console.log(output);
  notifications.send(output.join('\n'));
});
