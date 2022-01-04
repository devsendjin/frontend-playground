import path from 'path';

import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const publicDir = 'public';

console.log({ __PROD__, MODE });

const globals = { react: 'React', 'react-dom': 'ReactDOM' };

export default defineConfig({
  input: 'src/index.js',

  output: [
    {
      file: `${publicDir}/index.js`,
      format: 'iife',
      sourcemap: true,
    },
  ],

  watch: {
    clearScreen: true,
    exclude: 'node_modules/**',
    include: ['src/**', '../shared/styles/**'],
  },

  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(MODE),
      preventAssignment: true,
    }),
    nodeResolve({
      browser: true
    }),
    commonjs({
      sourceMap: true,
    }),
    postcss({
      extract: path.resolve(`${publicDir}/index.css`),
      modules: {
        generateScopedName: __PROD__ ? '[hash:base64:6]' : '[local]--[hash:base64:5]',
      },
      minimize: __DEV__ ? false : {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
      plugins: [postcssPresetEnv({stage: 2}), autoprefixer],
    }),
    __PROD__ && terser({
      mangle: true,
      compress: {
        defaults: true,
        drop_console: false, // false by default. Pass true to discard calls to console.* functions.
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
    }),
  ].filter(Boolean),
});
