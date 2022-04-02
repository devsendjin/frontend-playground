import path from 'path';
import fs from 'fs';

import webpack, { Configuration } from 'webpack';
import postcss from 'postcss';
import sass from 'sass';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';
// import FriendlyErrorsWebpackPlugin from '@soda/friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolvePath, transformFileExtension } from '@frontend-playground/config';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

// @ts-ignore
const PROJECT_ROOT = resolvePath({ folderToLookup: 'packages' });
const APP_ROOT = path.resolve('./');
const APP_SRC = path.join(APP_ROOT, 'src');

const PAGES_SRC = path.resolve('./src/templates/pages');

const renamePathTo = (filePath: string, renameTo: string) => {
  if (filePath.length === 1) return path.join('/', filePath, renameTo);
  if (filePath.length < 1) return `/${renameTo}`;

  const correctPath = filePath.replace(/([A-Za-z0-9-_]+)+\.(html|pug)$/gim, 'index.html');

  return path.join(correctPath);
};

const getSourceFiles = (templatesDir: string, options: { generateFileNamesOnly?: boolean } = {}) => {
  const { generateFileNamesOnly = false } = options;
  const accumulator: string[] = [];

  const templatesDirExists = fs.existsSync(templatesDir);

  if (!templatesDirExists) {
    console.error('SRC directory not found!');
    return accumulator;
  }

  return fs.readdirSync(templatesDir).reduce<string[]>((acc, currentPath) => {
    const srcFile = path.join(`${templatesDir}/${currentPath}`);

    const stat = fs.statSync(srcFile);
    const isDirectory = stat && stat.isDirectory();

    if (isDirectory) {
      const innerPaths = getSourceFiles(path.join(templatesDir, currentPath));
      if (innerPaths.length) {
        if (generateFileNamesOnly) {
          acc = acc.concat(innerPaths);
        } else {
          acc = acc.concat(innerPaths.map((innerPath) => path.join(currentPath, innerPath)));
        }
      }
    }

    if (!isDirectory) {
      acc.push(currentPath);
    }

    return acc;
  }, accumulator);
};

const SOURCE_FILES = getSourceFiles(PAGES_SRC); // files from pages
const PUG_FILES = SOURCE_FILES.filter((file) => file.endsWith('.pug'));
const TYPESCRIPT_FILES = SOURCE_FILES.filter((file) => file.endsWith('.ts'));
const JAVASCRIPT_FILES = TYPESCRIPT_FILES.map((file) => transformFileExtension(file, 'ts', 'js'));
const STYLE_FILES = SOURCE_FILES.filter((file) => file.endsWith('.scss') || file.endsWith('.css'));
// const HTML_FILES = PUG_FILES.map((file) => renamePathTo(file, 'index.html'));
const HTML_FILES = PUG_FILES.map((file) => transformFileExtension(file, 'pug', 'html'));

const NAV_LINKS = HTML_FILES.map((file) => {
  // replace 'index.html' || 'index.pug'
  const index = file.lastIndexOf('/');

  if (index === -1) return '/';
  return file.substring(0, index + 1);
});

const pugData = {
  links: NAV_LINKS,
  scripts: JAVASCRIPT_FILES,
  styles: STYLE_FILES,
  _meta: { __DEV__, __PROD__ },
};

console.log({
  MODE,
  __PROD__,
  __DEV__,

  PROJECT_ROOT,
  APP_ROOT,
  APP_SRC,

  PAGES_SRC,

  SOURCE_FILES,
  PUG_FILES,
  TYPESCRIPT_FILES,
  JAVASCRIPT_FILES,
  STYLE_FILES,
  HTML_FILES,
  NAV_LINKS,

  pugData,
});

console.log(
  "JAVASCRIPT_FILES.map((file) => ({ [file]: path.join(APP_SRC, transformFileExtension(file, 'ts', 'js')) }))",
  JAVASCRIPT_FILES.reduce<{ [key: string]: string }>((acc, file) => {
    acc[file] = path.join(APP_SRC, transformFileExtension(file, 'js', 'ts'));
    return acc;
  }, {})
);

const webpackConfig: Configuration = {
  mode: MODE,

  entry: {
    'scripts/index.ts': path.join(APP_SRC, 'scripts/index.ts'),
    // 'samples/jumping-links/jumping-links.js':
    //   '/Users/devsendjin/Projects/frontend-playground/packages/html/src/templates/pages/samples/jumping-links/jumping-links.ts',
    // ...JAVASCRIPT_FILES.reduce<{ [key: string]: string }>((acc, file) => {
    //   acc[file] = path.join(APP_SRC, transformFileExtension(file, 'js', 'ts'));
    //   return acc;
    // }, {}),
  },

  output: {
    // filename: '[name].js',
    filename: (pathData) => {
      // console.log({ pathData });
      return pathData.runtime as string;
      // return '[name].js';
    },
    path: path.join(APP_ROOT, 'public'),
    // path: path.join(APP_ROOT, 'public'),
  },

  // error stats handled by @soda/friendly-errors-webpack-plugin
  stats: 'normal', // none | normal | summary | minimal | verbose | errors-only | errors-warnings | detailed;

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: {
      '@': APP_SRC,
      // '@@': PROJECT_ROOT,
    },
  },

  target: 'web',

  devtool: __DEV__ ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              url: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: __DEV__,
              implementation: postcss,
              postcssOptions: {
                plugins: [['postcss-preset-env', { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              url: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: __DEV__,
              implementation: postcss,
              postcssOptions: {
                plugins: [['postcss-preset-env', { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: __DEV__,
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: path.join(APP_SRC, 'templates'),
              pretty: true,
              data: pugData,
            },
          },
        ],
      },
    ],
  },

  optimization: __PROD__
    ? {
        nodeEnv: MODE,
        minimize: true,
        minimizer: [
          new TerserPlugin({
            exclude: /node_modules/,
            extractComments: false,
            terserOptions: {
              parse: {
                html5_comments: false,
              },
              mangle: true,
              sourceMap: false,
              compress: {
                defaults: true,
                drop_console: false, // false by default. Pass true to discard calls to console.* functions.
                keep_infinity: true, // false by default. Pass true to prevent Infinity from being compressed into 1/0, which may cause performance issues on Chrome.
                passes: 2, // 1 by default. The maximum number of times to run compress.
              },
              format: {
                comments: false, // "some" by default
                preamble: '', // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
                quote_style: 3, // 0 by default. 3 - always use the original quotes.
                preserve_annotations: false, // false by default.
                ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
              },
              ecma: 2020, // 5 by default. Desired EcmaScript standard version for output.
              keep_classnames: false, // undefined by default.
              keep_fnames: false, // false by default.
              safari10: false, // false by default.
            },
          }),
        ],
      }
    : {},

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: __DEV__,
      __PROD__: __PROD__,
    }),

    // new FriendlyErrorsWebpackPlugin(),

    new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
  ],
};

if (__PROD__) {
  webpackConfig.plugins!.push(new CssoWebpackPlugin());
}

if (PUG_FILES.length > 0) {
  webpackConfig.plugins!.push(
    ...PUG_FILES.map((template) => {
      return new HtmlWebpackPlugin({
        template: `${PAGES_SRC}/${template}`,
        // filename: `../${transformFileExtension(template, 'pug', 'html')}`, // relative to public
        filename: `${renamePathTo(template, 'index.html')}`, // relative to public
        inject: false,
      });
    })
  );
}

module.exports = webpackConfig;
