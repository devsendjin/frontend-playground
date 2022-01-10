import path from 'path';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Sass from 'sass';
import Postcss from 'postcss';

const getLoaders = (config) => {
  return {
    // if any postcss error happens
    // https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users
    postCss: {
      loader: 'postcss-loader',
      options: {
        implementation: Postcss,
        postcssOptions: {
          plugins: [['postcss-preset-env', { stage: 2 }], postcssFlexbugsFixes, autoprefixer],
        },
      },
    },
    sass: {
      loader: 'sass-loader',
      options: {
        sourceMap: config.__DEV__,
        implementation: Sass,
        additionalData: `
          @import "src/assets/styles/abstracts/_config.scss";
        `,
        // @import "${path.join(config.APP_SRC, 'assets/styles/abstracts/_config.scss')}";
        sassOptions: {
          includePaths: [
            path.join(config.APP_SRC, 'assets/styles/abstracts/**/*.scss'),
          ],
        },
      },
    },
    css: {
      loader: 'css-loader',
      options: {
        sourceMap: config.__DEV__,
        importLoaders: 2,
      },
    },
    cssModules: {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        esModule: true,
        modules: {
          localIdentName: config.isServerRunning ? '[local]--[hash:base64:5]' : '[hash:base64:6]',
        },
        sourceMap: config.__DEV__,
      },
    },
    tsx: ['babel-loader', 'ts-loader'],
    js: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      'source-map-loader',
    ],
    styleOrExtractCss: {
      loader: config.isServerRunning ? 'style-loader' : MiniCssExtractPlugin.loader,
    },
  };
};

const getRules = (config) => {
  const { paths } = config;

  return {
    images: {
      test: /\.(avif|webp|png|jpe?g|gif)$/i,
      exclude: /\.(svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: paths.images,
            name: '[name].[ext]',
            publicPath: config.publicUrlOrPath,
          },
        },
      ],
    },
    svg: {
      test: /\.svg$/i,
      exclude: /node_modules/,
      use: [
        '@svgr/webpack',
        {
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: '[name].[ext]',
            outputPath: paths.svg,
            publicPath: config.publicUrlOrPath,
          },
        },
      ],
    },
  };
};

export { getRules, getLoaders };
