const config = require('./scripts/config.shared');

module.exports = (api) => {
  api.cache(true);

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
      ],
    ],
    plugins: [],
  };

  if (config.isServerRunning) {
    babelConfig.plugins.push(require.resolve('react-refresh/babel'));
  }

  return babelConfig;
};
