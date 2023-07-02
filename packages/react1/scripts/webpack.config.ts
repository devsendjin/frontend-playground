import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import webpack, { Configuration } from 'webpack';
// plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import config from './config';
import utils from './config.utils';

const loaders = utils.getLoaders(config);

const webpackConfig: Configuration & { devServer: DevServerConfiguration } = {
  mode: config.MODE,

  entry: {
    [`${config.paths.js}/`]: path.join(config.APP_SRC, 'index.tsx'),
  },

  output: {
    filename: '[name][contenthash].js',
    path: config.APP_PUBLIC,
    chunkFilename: '[id].[chunkhash].js',
    publicPath: config.publicUrlOrPath,
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

  stats: config.__DEV__ || config.isServerRunning ? 'errors-warnings' : 'detailed', // none | detailed | verbose

  ignoreWarnings: [
    {
      message: /color-adjust/, // ignore deprecated css function (appears in bootstrap)
    },
  ],

  optimization: config.__PROD__
    ? {
        nodeEnv: config.MODE,
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            },
          }),
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
      // ts|tsx
      {
        test: /\.ts(x?)$/i,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      // jsx
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
      // js
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
      {
        test: /\.pug$/i,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: config.__DEV__,
          },
        },
        exclude: '/node_modules/',
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
      exclude: /node_modules/, // exclude detection of files based on a RegExp
      include: /react-hook-form/, // include specific files based on a RegExp
      failOnError: true, // add errors to webpack instead of warnings
      cwd: config.APP_ROOT, // set the current working directory for displaying module paths
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
    }),

    new HtmlWebpackPlugin({
      template: path.join(config.APP_SRC, 'index.pug'),
      filename: path.join(config.APP_PUBLIC, 'index.html'),
      inject: 'body',
      minify: config.__PROD__,
    }),

    config.isServerRunning &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),

    (config.__PROD__ || (config.__DEV__ && !config.isServerRunning)) &&
      new MiniCssExtractPlugin({ filename: `${config.paths.css}/[contenthash].css` }),
    // new MiniCssExtractPlugin({ filename: `${config.paths.css}/index.css` }),
  ].filter(Boolean),
};

export default webpackConfig;
