const YAML = require('yaml');
const fs = require('fs');

const file = fs.readFileSync('./config.yaml', 'utf8');
const config = YAML.parse(file);

module.exports = config;
