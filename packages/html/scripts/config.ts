// require('ts-node/register');
import path from 'path';
import pkg from '../package.json';
import utils from './utils';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const APP_ROOT = utils.resolvePath({
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
const siteCname = 'www.skichko.me';
const siteUrl = __PROD__ ? `https://${siteCname}` : `http://localhost:${port}`;

const vendorEntries = {
  'vendors/microlight': path.join(APP_SRC, 'assets/vendors/microlight/microlight.ts'),
  'vendors/prism': path.join(APP_SRC, 'assets/vendors/prism/prism.min.ts'),
} as const;

const vendors = Object.keys(vendorEntries).reduce<string[]>((acc, vendorEntry) => {
  acc.push(`${vendorEntry}.css`);
  acc.push(`${vendorEntry}.js`);
  return acc;
}, []);

const config = {
  MODE,
  __PROD__,
  __DEV__,

  distFolder,

  // webpack
  vendorEntries,
  vendors,

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

module.exports = config;
export default config;
