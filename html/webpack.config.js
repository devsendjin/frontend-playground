const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const PROJECT_ROOT = path.resolve('../');
const APP_ROOT = path.resolve('./');
const APP_SRC = path.join(APP_ROOT, 'src');

const TEMPLATES_SRC = path.resolve('./src/templates/pages');

const getTemplates = (templatesDir) => {
  const accumulator = [];

  const templatesDirExists = fs.existsSync(templatesDir);

  if (!templatesDirExists) {
    console.error('SRC directory not found!');
    return accumulator;
  }

  return fs.readdirSync(templatesDir).reduce((acc, currentPath) => {
    const srcFile = path.join(`${templatesDir}/${currentPath}`);

    const stat = fs.statSync(srcFile);
    const isDirectory = stat && stat.isDirectory();

    if (isDirectory) {
      const innerPaths = getTemplates(path.join(templatesDir, currentPath));
      if (innerPaths.length) {
        acc = acc.concat(innerPaths.map((innerPath) => path.join(currentPath, innerPath)));
      }
    }

    if (!isDirectory) {
      acc.push(currentPath);
    }

    return acc;
  }, accumulator);
};

const transformFileExtension = (providedPath, extFrom, extTo) => {
  return providedPath.replace(new RegExp(`\.${extFrom}$`, 'gi'), `.${extTo}`);
};

const TEMPLATES = getTemplates(TEMPLATES_SRC);
const HTML_TEMPLATES = TEMPLATES.map((template) => transformFileExtension(template, 'pug', 'html'));

console.log({
  MODE,
  __PROD__,
  __DEV__,

  PROJECT_ROOT,
  APP_ROOT,
  APP_SRC,

  TEMPLATES_SRC,

  TEMPLATES,
});

const webpackConfig = {
  mode: MODE,

  entry: {
    index: path.join(APP_SRC, 'scripts/index.ts'),
  },

  output: {
    filename: '[name].js',
    path: path.join(APP_ROOT, 'public/js'),
  },

  // error stats handled by @soda/friendly-errors-webpack-plugin
  stats: 'normal', // none | normal | summary | minimal | verbose | errors-only | errors-warnings | detailed;

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: {
      '@': APP_SRC,
      '@@': PROJECT_ROOT,
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
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: __DEV__,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: __DEV__,
              implementation: require('postcss'),
              postcssOptions: {
                plugins: [['postcss-preset-env', { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: __DEV__,
              implementation: require('sass'),
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
              pretty: true,
              data: {
                navigation: HTML_TEMPLATES,
              },
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
                preamble: null, // null by default. When passed it must be a string and it will be prepended to the output literally. The source map will adjust for this text. Can be used to insert a comment containing licensing information, for example.
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

    new FriendlyErrorsWebpackPlugin(),

    new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
  ],
};

if (__PROD__) {
  webpackConfig.plugins.push(new CssoWebpackPlugin());
}

if (TEMPLATES.length > 0) {
  webpackConfig.plugins.push(
    ...TEMPLATES.map(
      (template) =>
        new HtmlWebpackPlugin({
          template: `${TEMPLATES_SRC}/${template}`,
          filename: `../${template.replace(/\.pug$/, '.html')}`, // relative to public/js
          filename: `../${transformFileExtension(template, 'pug', 'html')}`, // relative to public/js
          inject: false,
        })
    )
  );
}

module.exports = webpackConfig;
