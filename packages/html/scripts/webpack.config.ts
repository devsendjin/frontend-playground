import path from 'path';
import fs from 'fs';

import webpack, { Configuration, Compiler } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssoWebpackPlugin from 'csso-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcss from 'postcss';
import sass from 'sass';

import config from './config';

// plugin help
// https://www.mo4tech.com/webpack-5-compilation-processassets-hook.html
type TOptions = {
  regexp?: RegExp;
  debug?: boolean;
  omitFileIf?: (assetContent: string | Buffer) => boolean;
};
const PLUGIN_NAME = 'omit-generating-files';
// const defaultOptions: TOptions = {};

// @ts-ignore
class OmitGeneratingFilesPlugin {
  constructor(private options?: TOptions) {
    // this.options = { ...defaultOptions, ...options };
    this.options = options;
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      if (this.options?.regexp) {
        compilation.hooks.processAssets.tapAsync(
          {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          (assetsObj, callback) => {
            const assets = Object.keys(assetsObj);

            if (this.options?.debug) {
              console.log('\n\ncompiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL\n', { assets });
            }
            assets.forEach((assetPath) => {
              if (
                assetPath.match(this.options!.regexp as RegExp) ||
                (this.options?.omitFileIf && this.options.omitFileIf(assetPath))
              ) {
                compilation.deleteAsset(assetPath);
              }
            });
            callback();
          }
        );
      }

      if (this.options?.omitFileIf) {
        compilation.hooks.processAssets.tapAsync(
          {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
          },
          (assetsObj, callback) => {
            const assets = Object.keys(assetsObj);

            if (this.options?.debug) {
              console.log('\n\ncompiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING\n', { assets });
            }

            assets.forEach((assetPath) => {
              if (this.options?.omitFileIf && this.options.omitFileIf(assetsObj[assetPath].source())) {
                compilation.deleteAsset(assetPath);
              }
            });
            callback();
          }
        );
      }
    });
  };
}

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

const trimExtension = (filePath: string) => {
  return filePath.replace(/\.\w*$/gim, '');
};

const loaders = {
  css: {
    loader: 'css-loader',
    options: {
      sourceMap: config.__DEV__,
      url: false,
      importLoaders: 2,
    },
  },
  postCss: {
    loader: 'postcss-loader',
    options: {
      implementation: postcss,
      postcssOptions: {
        plugins: [['postcss-preset-env', { stage: 4 }], postcssFlexbugsFixes, autoprefixer],
      },
    },
  },
  sass: {
    loader: 'sass-loader',
    options: {
      sourceMap: config.__DEV__,
      implementation: sass,
    },
  },
};

const SOURCE_FILES = getSourceFiles(config.PAGES_SRC);
const TYPESCRIPT_FILES = SOURCE_FILES.filter((file) => file.endsWith('.ts'));

const webpackConfig: Configuration = {
  mode: config.MODE as Configuration['mode'],

  entry: {
    index: path.join(config.APP_SRC, 'assets/scripts/index.ts'),
    playground: path.join(config.APP_SRC, 'assets/styles/playground.scss'),
    ...config.vendorEntries,
    ...TYPESCRIPT_FILES.reduce<{ [key: string]: string }>((acc, filePath) => {
      acc[trimExtension(filePath)] = path.join(config.PAGES_SRC, filePath);
      return acc;
    }, {}),
  },

  output: {
    filename: '[name].js',
    path: path.join(config.APP_ROOT, config.distFolder),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss', '.json'],
    alias: {
      '@': config.APP_SRC,
      '@scripts': path.resolve(config.APP_SRC, 'assets/scripts'),
      '@styles': path.resolve(config.APP_SRC, 'assets/styles'),
    },
  },

  target: 'web',

  devtool: config.__DEV__ ? 'inline-source-map' : false,

  stats: config.__DEV__ ? 'errors-warnings' : 'none', // none | detailed | verbose

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
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    bugfixes: true,
                    debug: false,
                    spec: false,
                    loose: false,
                    modules: 'auto',
                    useBuiltIns: false,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, loaders.css, loaders.postCss, loaders.sass],
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, loaders.css, loaders.postCss],
      },
    ],
  },

  // @ts-ignore
  plugins: [
    new OmitGeneratingFilesPlugin({
      // regexp: /(404|front-page|playground)\.js/gi,
      omitFileIf: (assetContent) => assetContent === '', // filter empty js files
      // debug: true,
    }),

    new webpack.DefinePlugin({
      __DEV__: config.__DEV__,
      __PROD__: config.__PROD__,
    }),

    new MiniCssExtractPlugin({
      filename: () => {
        return '[name].css';
      },
    }),

    config.__PROD__ && new CssoWebpackPlugin({ comments: false }),
  ].filter(Boolean),
};

export default webpackConfig;
