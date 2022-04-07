const config = require('../../scripts/config');

module.exports = function () {
  return {
    name: 'HTML playground',
    description: 'Frontend playground for ideas',
    author: config.author.name,
    url: config.siteUrl,
    __DEV__: config.__DEV__,
    __PROD__: config.__PROD__,
  };
};
