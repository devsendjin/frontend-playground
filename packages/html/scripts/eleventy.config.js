// eleventy/pug permalink error
// https://github.com/11ty/eleventy/issues/286#issuecomment-451811489
// https://github.com/11ty/eleventy/issues/286#issuecomment-436247985

// eleventy/pug filters support
// https://github.com/11ty/eleventy/issues/1523

require('ts-node/register');
const path = require('path');
const fs = require('fs');
const pug = require('pug');

const beautifyHtml = require('js-beautify').html;
const htmlmin = require('html-minifier');
const util = require('util'); // debugger

const config = require('./config');

const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]:
            typeof source[key] === 'string' && target[key] && !target[key].includes(source[key])
              ? [target[key], source[key]].join(' ')
              : source[key],
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

// urls
const urlBuilder = (url) => path.join('/', url);
const assetUrl = (assetUrl) => urlBuilder(path.join('assets', assetUrl));

module.exports = function (eleventyConfig) {
  // eleventy/pug filters support
  global.filters = eleventyConfig.javascriptFunctions;
  eleventyConfig.setPugOptions({
    globals: [global.filters],
    pretty: false,
  });
  eleventyConfig.setLibrary('pug', pug);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addGlobalData('_log', () => util.inspect);
  eleventyConfig.addGlobalData('_merge', () => {
    return (target, ...sources) => mergeDeep(target, ...sources);
  });
  eleventyConfig.addGlobalData('_url', () => urlBuilder);
  eleventyConfig.addGlobalData('_asset', () => assetUrl);
  eleventyConfig.addGlobalData('_fileExists', () => (url) => {
    const filePath = path.join(config.APP_DIST, url);
    const exists = fs.existsSync(filePath);
    // console.log({
    //   'path.join(config.APP_DIST, url)': filePath,
    //   'fs.existsSync(path.join(config.APP_DIST, url))': exists,
    // });
    return exists;
  });
  eleventyConfig.addGlobalData('_space', () => {
    return (amount = 1) => {
      return Array.from({ length: amount }, () => '&nbsp;').join('');
    };
  });
  // eleventyConfig.addGlobalData("_image", () => imageUrl);

  // folder assets with keeping the same directory structure
  eleventyConfig.addPassthroughCopy('src/pages/**/*.(jpg|jpeg|png)');

  eleventyConfig.addTransform('htmlTransform', function (content) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (!this.outputPath || !this.outputPath.endsWith('.html')) return content;

    if (config.__DEV__) {
      return beautifyHtml(content, {
        // "extra_liners": ['svg'],
        // "unformatted": ['span'],
        inline: ['br', 'b', 'strong'],
        indent_size: 2,
        indent_char: '\t',
        indent_with_tabs: false,
        editorconfig: false,
        eol: '\n',
        end_with_newline: true,
        indent_level: 0,
        preserve_newlines: false,
        max_preserve_newlines: 10000,
      });
    } else if (config.__PROD__) {
      return htmlmin.minify(content, {
        useShortDoctype: false,
        removeComments: false,
        collapseWhitespace: false,
      });
    }

    return content;
  });

  eleventyConfig.setBrowserSyncConfig({
    files: [`./${config.distFolder}/**/*`],
    port: config.port,
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const path_404 = path.join(config.APP_ROOT, config.distFolder, '/404/index.html');

          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });

          if (!fs.existsSync(path_404)) {
            res.write('<h1>404.html page not found</h1>');
            return res.end();
          }

          const content_404 = fs.readFileSync(path_404);
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      output: config.distFolder,
      input: 'src/pages',
      includes: '../templates',
      layouts: '../templates/layouts',
      data: '../data',
    },
    templateFormats: ['html', 'pug'],
    jsDataFileSuffix: '.data',
  };
};
