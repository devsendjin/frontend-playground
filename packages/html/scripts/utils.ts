import path from "path";
import fs from "fs";

// const resolvePath = ({
//   folderToLookup,
//   onLookupSuccess,
//   onLookupFailed,
//   recursionMaxLevel = 10,
// }: {
//   folderToLookup: string;
//   onLookupSuccess?: (resolvedPath: string) => string;
//   onLookupFailed?: () => string;
//   recursionMaxLevel?: number;
// }): string => {
//   let directories: string[] = [];
//   let directoryDepth = 0;
//   let pathToLookup = './';

//   const readDir = () => {
//     // guard against recursion
//     if (directoryDepth >= recursionMaxLevel) {
//       if (onLookupFailed) {
//         pathToLookup = onLookupFailed();
//         return;
//       } else {
//         throw Error(`Can't resolve project root! directoryDepth = ${directoryDepth}`);
//       }
//     }

//     directoryDepth++;

//     try {
//       directories = fs.readdirSync(pathToLookup, { encoding: 'utf-8' });
//       if (!directories.includes(folderToLookup)) {
//         pathToLookup = pathToLookup.concat('../');
//         readDir();
//       }
//     } catch (e) {
//       console.error('Error occurred during dir reading: ', e);
//       process.exit(0);
//     }
//   };
//   readDir();

//   const resolvedPath = path.resolve(pathToLookup);

//   if (onLookupSuccess) {
//     return onLookupSuccess(resolvedPath);
//   }

//   return resolvedPath;
// };

const readDirectory = (
  templatesDir: string,
  options: { generateFileNamesOnly?: boolean; recursive?: boolean } = {}
) => {
  const { generateFileNamesOnly = false, recursive = true } = options;
  const accumulator: string[] = [];

  const templatesDirExists = fs.existsSync(templatesDir);

  if (!templatesDirExists) {
    console.error("base directory not found!");
    return accumulator;
  }

  return fs.readdirSync(templatesDir).reduce<string[]>((acc, pathSlug) => {
    const srcPath = path.join(`${templatesDir}/${pathSlug}`);

    const stat = fs.statSync(srcPath);
    const isDirectory = stat && stat.isDirectory();

    if (recursive && isDirectory) {
      const innerPaths = readDirectory(path.join(templatesDir, pathSlug));
      if (innerPaths.length) {
        if (generateFileNamesOnly) {
          acc = acc.concat(innerPaths);
        } else {
          acc = acc.concat(innerPaths.map((innerPath) => path.join(pathSlug, innerPath)));
        }
      }
    }

    if (!isDirectory) {
      acc.push(pathSlug);
    }

    return acc;
  }, accumulator);
};

const trimExtension = (filePath: string): string => {
  return filePath.replace(/\.\w*$/gim, "");
};

const isDirnameMatchFilename = (targetPath: string): boolean => {
  const parsed = path.parse(targetPath);
  return parsed.dir.endsWith(parsed.name);
};

type AliasMap = Record<string, string>;
const createAliases = (aliasParentPath: string, aliasRirectoryList: string[]): Readonly<AliasMap> => {
  if (!aliasRirectoryList.length) return {};

  const srcAbsolutePathList = aliasRirectoryList.map((file) => path.join(aliasParentPath, file));

  if (!srcAbsolutePathList.length) return {};

  return srcAbsolutePathList
    .filter((file) => fs.statSync(file).isDirectory())
    .reduce<AliasMap>((acc, dir) => {
      const alias = dir.split("/").filter(Boolean).pop();
      if (alias) {
        acc[alias] = dir;
      }
      return acc;
    }, {});
};

export { readDirectory, trimExtension, isDirnameMatchFilename, createAliases };
