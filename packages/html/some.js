const fs = require('fs');
const path = require('path');

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

const TEMPLATES = getTemplates(TEMPLATES_SRC).map((p) => p.replace(/\.pug$/, '.html'));
console.log({ TEMPLATES });

const resolvePath = ({ folderToLookup = 'application', withTrailingSlash = false, recursionMaxLevel = 10 } = {}) => {
  let directories = [];
  let directoryDepth = 0;
  let pathToLookup = './';

  const readDir = () => {
    // guard against recursion
    if (directoryDepth >= recursionMaxLevel) {
      throw Error(`Can't resolve project root. directoryDepth = ${directoryDepth}`);
    }

    directoryDepth++;

    try {
      directories = fs.readdirSync(pathToLookup, { encoding: 'utf-8' });
      if (!directories.includes(folderToLookup)) {
        pathToLookup = pathToLookup.concat('../');
        readDir();
      }
    } catch (e) {
      console.error('Error occurred during dir reading: ', e);
      process.exit(0);
    }
  };
  readDir();

  const resolvedPath = path.resolve(pathToLookup);

  return withTrailingSlash ? `${resolvedPath}/` : resolvedPath;
};

// const PROJECT_ROOT = path.resolve('../');
const PROJECT_ROOT = resolvePath({
  folderToLookup: 'packages',
  withTrailingSlash: true,
});
console.log({ PROJECT_ROOT });
