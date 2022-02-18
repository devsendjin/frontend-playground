const fs = require('fs');
const path = require('path');

const resolvePath = ({ folderToLookup = 'packages', withTrailingSlash = false, recursionMaxLevel = 10 } = {}) => {
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

const transformFileExtension = (providedPath, extFrom, extTo) => {
  return providedPath.replace(new RegExp(`\.${extFrom}$`, 'gi'), `.${extTo}`);
};

module.exports = {
  resolvePath,
  transformFileExtension,
};
