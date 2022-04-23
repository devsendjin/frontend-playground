import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import webpack, { Configuration } from 'webpack';
// plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';

import config from './config';
import utils from './config.utils';

const loaders = utils.getLoaders(config);

const webpackConfig: Configuration & { devServer: DevServerConfiguration } = {
  mode: config.MODE,

  entry: path.join(config.APP_SRC, 'index.tsx'),

  output: {
    filename: 'index.js',
    path: config.paths.js,
    chunkFilename: '[id].[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: config.alias,
  },

  target: 'web',

  devtool: config.__DEV__ ? 'eval-cheap-module-source-map' : false,

  devServer: config.__DEV__
    ? {
        static: {
          directory: path.join(config.APP_ROOT, 'public'),
        },
        client: {
          logging: 'none',
          overlay: false,
        },
        compress: true,
        hot: config.isServerRunning, // instead webpack.HotModuleReplacementPlugin
        port: config.port,
        historyApiFallback: true,
        devMiddleware: {
          writeToDisk: false,
        },
      }
    : {},

  stats: config.isServerRunning ? 'errors-warnings' : 'detailed', // none | detailed | verbose

  optimization: config.__PROD__
    ? {
        nodeEnv: config.MODE,
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

  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // sass modules
      {
        test: /\.module\.s[ac]ss$/i,
        use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss(), loaders.sass()],
      },
      // sass files
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss(), loaders.sass()],
      },
      // css modules
      {
        test: /\.module\.css$/i,
        use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss()],
      },
      // css files
      {
        test: /\.css$/i,
        use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss()],
        exclude: /\.module\.css$/i,
      },
      // images
      {
        test: /\.(avif|webp|png|jpe?g|gif)$/i,
        exclude: /\.(svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: config.paths.images,
              name: '[name].[ext]',
              publicPath: config.publicUrlOrPath,
            },
          },
        ],
      },
      // svg
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          '@svgr/webpack',
          {
            loader: 'url-loader',
            options: {
              limit: 3000,
              name: '[name].[ext]',
              outputPath: config.paths.svg,
              publicPath: config.publicUrlOrPath,
            },
          },
        ],
      },
    ],
  },

  // @ts-ignore
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: config.__DEV__,
      __PROD__: config.__PROD__,
    }),

    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // include specific files based on a RegExp
      include: /react-hook-form/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: config.APP_ROOT,
    }),

    config.isServerRunning &&
      new HtmlWebpackPlugin({
        template: path.join(config.APP_ROOT, 'public/index.html'),
      }),

    config.isServerRunning &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),

    (config.__PROD__ || (config.__DEV__ && !config.isServerRunning)) &&
      new MiniCssExtractPlugin({ filename: `${config.paths.css}/index.css` }),

    config.__PROD__ &&
      new CssoWebpackPlugin({
        comments: false,
      }),
  ].filter(Boolean),
};

export default webpackConfig;
