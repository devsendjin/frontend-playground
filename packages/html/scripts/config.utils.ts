// require('ts-node/register');
const fs = require('fs');
const path = require('path');

const resolvePath = ({
  folderToLookup,
  onLookupSuccess,
  onLookupFailed,
  recursionMaxLevel = 10,
}: {
  folderToLookup: string;
  onLookupSuccess?: (resolvedPath: string) => string;
  onLookupFailed?: () => string;
  recursionMaxLevel?: number;
}): string => {
  let directories = [];
  let directoryDepth = 0;
  let pathToLookup = './';

  const readDir = () => {
    // guard against recursion
    if (directoryDepth >= recursionMaxLevel) {
      if (onLookupFailed) {
        pathToLookup = onLookupFailed();
        return;
      } else {
        throw Error(`Can't resolve project root! directoryDepth = ${directoryDepth}`);
      }
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

  if (onLookupSuccess) {
    return onLookupSuccess(resolvedPath);
  }

  return resolvedPath;
};

module.exports = {
  resolvePath,
};

export { resolvePath };
