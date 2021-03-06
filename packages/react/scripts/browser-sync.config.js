// https://browsersync.io/docs/options

require('ts-node/register');
const config = require('./config').default;

module.exports = {
  server: config.APP_PUBLIC,
  files: [`${config.APP_PUBLIC}/**/*.(html|css|js)`],
  notify: false,
  ui: false,
  port: config.port + 1,
  open: true,
  browser: ['google chrome'],
};
