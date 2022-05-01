import path from 'path';
import fs from 'fs';
import { RuleSetUseItem } from 'webpack';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Sass from 'sass';
import Postcss from 'postcss';

import { TConfiguration } from './config';

type TResolvePath = (params: {
  folderToLookup: string;
  onLookupSuccess?: (resolvedPath: string) => string;
  onLookupFailed?: () => string;
  recursionMaxLevel?: number;
}) => string;
const resolvePath: TResolvePath = ({ folderToLookup, onLookupSuccess, onLookupFailed, recursionMaxLevel = 10 }) => {
  let directories = [];
  let directoryDepth = 0;
  let pathToLookup = './';

  const readDir = () => {
    // guard against recursion
    if (directoryDepth >= recursionMaxLevel) {
      if (onLookupFailed) {
        pathToLookup = onLookupFailed();
        return;
      } else {
        throw Error(`Can't resolve project root! directoryDepth = ${directoryDepth}`);
      }
    }

    directoryDepth++;

    try {
      directories = fs.readdirSync(pathToLookup, { encoding: 'utf-8' });
      if (!directories.includes(folderToLookup)) {
        pathToLookup = pathToLookup.concat('../');
        readDir();
      }
    } catch (e) {
      console.error('Error occurred during dir reading: ', e);
      process.exit(0);
    }
  };
  readDir();

  const resolvedPath = path.resolve(pathToLookup);

  if (onLookupSuccess) {
    return onLookupSuccess(resolvedPath);
  }

  return resolvedPath;
};

const getPublicUrlOrPath = () => '/';

type TGetLoadersReturn<TRuleSetUseItem = RuleSetUseItem> = {
  postCss: () => TRuleSetUseItem;
  sass: () => TRuleSetUseItem;
  css: () => TRuleSetUseItem;
  cssModules: () => TRuleSetUseItem;
  styleOrExtractCss: () => TRuleSetUseItem;
};
type TGetLoaders = (config: TConfiguration) => TGetLoadersReturn;
const getLoaders: TGetLoaders = (config) => {
  return {
    // if any postcss error happens
    // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
    postCss: () => ({
      loader: 'postcss-loader',
      options: {
        implementation: Postcss,
        postcssOptions: {
          plugins: [['postcss-preset-env', { stage: 4 }], postcssFlexbugsFixes, autoprefixer],
        },
      },
    }),
    sass: () => ({
      loader: 'sass-loader',
      options: {
        sourceMap: config.__DEV__,
        implementation: Sass,
        additionalData: `
          @import "src/assets/styles/abstracts/_index.scss";
        `,
        sassOptions: {
          includePaths: [path.join(config.APP_SRC, 'assets/styles/abstracts/**/*.scss')],
        },
      },
    }),
    css: () => ({
      loader: 'css-loader',
      options: {
        sourceMap: config.__DEV__,
        importLoaders: 2,
      },
    }),
    cssModules: () => ({
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        esModule: true,
        modules: {
          localIdentName: config.__DEV__ ? "[local]--[folder]--[hash:base64:3]" : "[hash:base64:6]",
        },
        sourceMap: config.__DEV__,
      },
    }),
    styleOrExtractCss: () => (config.isServerRunning ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader),
  };
};

export default { getLoaders, resolvePath, getPublicUrlOrPath };
