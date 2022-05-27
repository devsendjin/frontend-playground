import path from 'path';
import fs from 'fs';

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
  let directories: string[] = [];
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

const isDirnameMatchFilename = (targetPath: string) => {
  const parsed = path.parse(targetPath);
  return parsed.dir.endsWith(parsed.name);
};

export default { resolvePath, getSourceFiles, trimExtension, isDirnameMatchFilename };
