// https://browsersync.io/docs/options

require('ts-node/register');
const config = require('./config').default;

console.log({'sad':`${config.APP_PUBLIC}/**/*.(html|css|js)`, 'qwe':config.APP_PUBLIC});
module.exports = {
  server: config.APP_PUBLIC,
  files: [`${config.APP_PUBLIC}/**/*.(html|css|js)`],
  notify: false,
  ui: false,
  port: config.port + 1,
  open: true,
  browser: ['google chrome'],
};
