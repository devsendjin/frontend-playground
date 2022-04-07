import { scope, l } from '@scripts/utils/playground';
// import 'material-design-lite/material.min';

scope(() => {
  // const renameToIndexHtml = (path: string) => {
  //   if (path.length < 1) return path;

  //   const index = path.lastIndexOf('/');
  //   const res = str.substring(0, index);
  //   return `${res}/index.html`;
  // };
  const renamePathTo = (path: string, renameTo: string) => {
    const defaultPath = `/${renameTo}`;

    if (path.length === 1) return `${path}${renameTo}`;
    if (path.length < 1) return defaultPath;
    if ([...path].every((char) => char === '/')) return defaultPath;

    return path.replace(/([A-Za-z0-9-_]+)+\.(html|pug)$/gim, renameTo);
  };
  // const str = '/';
  const strs = [
    '/',
    '/index.html',
    '/index.pug',
    'test.pug',
    'qwe/asd/index.html',
    'asd/qwe/asd-qwe-1_.pug',
    '/asd/qwe/s_q.html',
    '/asd/qwe/index.html',
  ];
  const res = strs.map((s) => renamePathTo(s, 'index.html'));
  l({ res: res });

  const link = '/asd/qwe/s_q.html';
  // .replace(/\/?index\.html/gi, '');
  const index = link.lastIndexOf('/');
  const r = link.substring(0, index + 1);
  l({ index, r });
  // return `/${link}`;

  // /**
  //  * Simple object check.
  //  * @param item
  //  * @returns {boolean}
  //  */
  // function isObject(item) {
  //   return item && typeof item === 'object' && !Array.isArray(item);
  // }

  // /**
  //  * Deep merge two objects.
  //  * @param target
  //  * @param ...sources
  //  */
  // function mergeDeep(target, ...sources) {
  //   if (!sources.length) return target;
  //   const source = sources.shift();

  //   if (isObject(target) && isObject(source)) {
  //     for (const key in source) {
  //       if (isObject(source[key])) {
  //         if (!target[key]) Object.assign(target, { [key]: {} });
  //         mergeDeep(target[key], source[key]);
  //       } else {
  //         Object.assign(target, {
  //           [key]: typeof source[key] === 'string' ? [target[key], source[key]].join(' ') : source[key],
  //         });
  //       }
  //     }
  //   }

  //   return mergeDeep(target, ...sources);
  // }

  // l({ mergeDeep: mergeDeep({ a: 'asd' }, { a: 'qwe' }) });

  // l({ 'renameToIndexHtml(str)': renamePathTo(str, 'index.html') });
}, 'Current ts');
