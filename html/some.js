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
