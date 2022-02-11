import path from 'path';
import { resolvePath } from '@frontend-playground/shared/config';
import { getPublicUrlOrPath } from './config.utils';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const PROJECT_ROOT = resolvePath({ folderToLookup: 'packages' });
const APP_ROOT = path.resolve('./');
const APP_SRC = path.join(APP_ROOT, 'src');

const isServerRunning = process.env.WEBPACK_SERVE === 'true';

const paths = {
  js: path.join(APP_ROOT, 'public/js'),
  css: '../css', // relative to js
  images: '../images', // relative to js
  svg: '../images/icon', // relative to js
};

// change here + tsconfig.json (+ jest.config.js)
const alias = {
  '@': APP_SRC,
  '@images': path.resolve(APP_SRC, 'assets/images'),
  '@styles': path.resolve(APP_SRC, 'assets/styles'),
};

const config = {
  // path
  PROJECT_ROOT,
  APP_ROOT,
  APP_SRC,
  publicUrlOrPath: getPublicUrlOrPath(),
  paths,

  // webpack configs
  alias,
  port: 4004,
  isServerRunning,

  // other
  MODE,
  __PROD__,
  __DEV__,
};

console.log(config);

export default config;
