// require('ts-node/register');
import path from 'path';
import pkg from '../package.json';
import { resolvePath } from './config.utils';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const APP_ROOT = resolvePath({
  folderToLookup: 'scripts',
  onLookupFailed: () => {
    throw new Error('APP_ROOT can not be resolved');
  },
});
const distFolder = 'public';
const APP_DIST = path.join(APP_ROOT, distFolder);
const APP_SRC = path.join(APP_ROOT, 'src');
const PAGES_SRC = path.join(APP_SRC, 'pages');

const port = 8080;
const siteUrl = `http://localhost:${port}`;
// const siteUrl = __PROD__ ? `https://${siteCname}` : `http://localhost:${port}`;

const config = {
  MODE,
  __PROD__,
  __DEV__,

  distFolder,

  // paths
  APP_ROOT,
  APP_SRC,
  APP_DIST,
  PAGES_SRC,

  // site
  port,
  siteUrl,
  author: pkg.author,
};

// console.log(config);

module.exports = config;
export default config;
