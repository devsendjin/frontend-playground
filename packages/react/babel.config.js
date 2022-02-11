const config = require('./scripts/config.js');

module.exports = (api) => {
  api.cache.forever();

  const babelConfig = {
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
          debug: false,
          spec: false,
          loose: false,
          modules: 'auto',
          useBuiltIns: false,
        },
      ]
    ],
    plugins: [
      ["@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ],
    ],
  };

  if (config.isServerRunning) {
    babelConfig.plugins.push(require.resolve('react-refresh/babel'));
  }

  return babelConfig;
};
