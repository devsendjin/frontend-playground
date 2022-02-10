const fs = require('fs');
const path = require('path');

const readDir = (pathToRead) => {
  if (!fs.existsSync(pathToRead)) {
    console.error(`"${pathToRead}" not found!`);
    return [];
  }
  // return fs.readdirSync(pathToRead).filter((currentPath) => {
  //   const isDirectory = fs.lstatSync(path.join(pathToRead, currentPath)).isDirectory();
  //   if (isDirectory) {
  //     paths.push(...readDir(path.join(pathToRead, currentPath)).map((p) => path.join(pathToRead, currentPath, p)));
  //     console.log({
  //       'fs.readdirSync(path.join(pathToRead, currentPath)): ': fs.readdirSync(path.join(pathToRead, currentPath)),
  //     });
  //   }
  //   return currentPath.endsWith('.pug');
  // });
  return fs
    .readdirSync(pathToRead)
    .reduce((acc, currentPath) => {
      const isDirectory = fs.lstatSync(path.join(pathToRead, currentPath)).isDirectory();
      console.log({
        isDirectory,
        currentPath,
        'path.join(pathToRead, currentPath): ': path.join(pathToRead, currentPath),
      });
      if (isDirectory) {
        acc = acc.concat(
          acc,
          readDir(path.join(pathToRead, currentPath)).map((p) => path.join(pathToRead, currentPath, p))
        );
      }
      console.log({ acc });
      acc = acc.concat(acc, path.join(pathToRead, currentPath));
      return acc;
    }, [])
    .filter((p) => p.endsWith('.pug'));
};

// if (!fs.existsSync(TEMPLATES_SRC)) return [];
const SRC_PAGES = path.resolve('./src/templates/pages');
const DIST_PAGES = path.join(process.cwd(), 'public');

const walk = function (srcDir, distDir) {
  const accumulator = { src: [], dist: [] };

  const srcDirExists = fs.existsSync(srcDir);
  const distDirExists = !!distDir === true;

  if (!srcDirExists || !distDirExists) {
    if (!srcDirExists) {
      console.error('SRC directory not found!');
    }
    if (!distDirExists) {
      console.error('DIST directory not found!');
    }
    return accumulator;
  }

  return fs.readdirSync(srcDir).reduce((acc, file) => {
    srcFile = `${srcDir}/${file}`;
    distFile = `${distDir}/${file}`;
    // console.log({ acc, srcFile, distFile });
    const stat = fs.statSync(srcFile);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      console.log({ acc });
      acc.src = acc.src.concat(acc.src, walk(srcFile, distDir));
      acc.dist = acc.dist.push(distFile);
    } else {
      /* Is a file */
      acc.src = acc.src.push(srcFile);
      acc.dist = acc.dist.push(distFile);
    }
    return acc;
  }, accumulator);
};

const pages = (() => {
  console.log(walk(SRC_PAGES, DIST_PAGES));
  // console.log(readDir(PAGES_SRC));
  // if (!fs.existsSync(PAGES_SRC)) {
  //   console.error(`"${PAGES_SRC}" not found!`);
  //   return [];
  // }
  // // console.log(fs.lstatSync(PAGES_SRC).isDirectory());
  // return fs.readdirSync(PAGES_SRC).filter((currentPath) => {
  //   const isDirectory = fs.lstatSync(path.join(PAGES_SRC, currentPath)).isDirectory();
  //   console.log({ currentPath, isDirectory });
  //   if (isDirectory) {
  //     console.log({
  //       'fs.readdirSync(path.join(PAGES_SRC, currentPath)): ': fs.readdirSync(path.join(PAGES_SRC, currentPath)),
  //     });
  //   }
  //   return currentPath.endsWith('.pug');
  // });
})();

// console.log({ pages });
