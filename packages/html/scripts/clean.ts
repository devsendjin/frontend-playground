// @ts-nocheck
import fs from 'fs';
import colors from 'colors';

import config from './config';

const dirList = fs.readdirSync(config.distFolder);
const excludedFolders = ['.git'];
const filtered = excludedFolders.length > 0 ? dirList.filter((dir) => !excludedFolders.includes(dir)) : dirList;

try {
  filtered.forEach((dir) => {
    fs.rmSync(`${config.distFolder}/${dir}`, { recursive: true });

    console.log(`${colors.green(dir)} ${colors.red('deleted!')}`);
  });
} catch (err) {
  console.log(colors.red('Error while deleting.'));
  console.log(colors.red('Error: '), err);
}
