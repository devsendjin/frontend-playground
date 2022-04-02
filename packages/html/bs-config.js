// https://browsersync.io/docs/options

module.exports = {
  server: './public',
  files: ['./**/*.(html|css|js)'],
  notify: false,
  ui: false,
  port: 4003,
  open: true,
  browser: ['google chrome'],
  // middleware: function (req, _res, next) {
  //   // strip slash at the end
  //   const url = req.url;
  //   console.log({
  //     'req.url': req.url,
  //     'url[url.length - 1]': url[url.length - 1],
  //     "url.length > 1 && url[url.length - 1] === '/'": url.length > 1 && url[url.length - 1] === '/',
  //     'url.slice(0, url.length - 1)': url.slice(0, url.length - 2),
  //   });

  //   if (url.length > 1 && url[url.length - 1] === '/') {
  //     req.url = url.slice(0, url.length - 1);
  //   }

  //   return next();
  // },
};
