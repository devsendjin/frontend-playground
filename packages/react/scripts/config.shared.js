const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const isServerRunning = process.env.WEBPACK_SERVE === 'true';
const isDistributed = process.env.IS_DISTRIBUTED === 'true';

const sharedConfig = {
  MODE,
  __PROD__,
  __DEV__,
  isServerRunning,
  isDistributed,
};

module.exports = sharedConfig;
