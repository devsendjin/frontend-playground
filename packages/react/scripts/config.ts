import path from 'path';
import sharedConfig from './config.shared';
import utils from './config.utils';

const MODE = sharedConfig.MODE as TMode;
const __PROD__ = sharedConfig.__PROD__;
const __DEV__ = sharedConfig.__DEV__;
const isServerRunning: boolean = sharedConfig.isServerRunning;

const APP_ROOT: string = utils.resolvePath({
  folderToLookup: 'scripts',
  onLookupFailed: () => {
    throw new Error('APP_ROOT can not be resolved');
  },
});
const APP_SRC: string = path.resolve(APP_ROOT, 'src');

const paths = {
  js: path.join(APP_ROOT, 'public/js'),
  css: '../css', // relative to js
  images: '../images', // relative to js
  svg: '../images/icon', // relative to js
} as const;

// change here + tsconfig.json (+ jest.config.js)
const alias = {
  '@': APP_SRC,
  '@images': path.resolve(APP_SRC, 'assets/images'),
  '@styles': path.resolve(APP_SRC, 'assets/styles'),
} as const;

const configuration = {
  // path
  APP_ROOT,
  APP_SRC,
  publicUrlOrPath: utils.getPublicUrlOrPath(),
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

console.log(configuration);

export type TMode = 'production' | 'development';
export type TConfiguration = typeof configuration;
export default configuration;
