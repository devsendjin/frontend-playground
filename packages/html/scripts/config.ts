// require('ts-node/register');
import fs from "fs";
import path from "path";
import pkg from "../package.json";
import { createAliases } from "./utils";

enum Mode {
  "development" = "development",
  "production" = "production",
}

const MODE = process.env.NODE_ENV === Mode.production ? Mode.production : Mode.development;
const __PROD__ = MODE === Mode.production;
const __DEV__ = !__PROD__;

const APP_ROOT = fs.realpathSync(process.cwd());

const distFolder = "public";
const APP_DIST = path.join(APP_ROOT, distFolder);
const APP_SRC = path.join(APP_ROOT, "src");
const PAGES_SRC = path.join(APP_SRC, "pages");
const ASSETS_SRC = path.join(APP_SRC, "assets");

const ASSETS_FILE_LIST = fs.readdirSync(ASSETS_SRC, { encoding: "utf8", withFileTypes: false });

const port = 8080;
const siteCname = "www.skichko.me";
const siteUrl = __PROD__ ? `https://${siteCname}` : `http://localhost:${port}`;

const vendorEntries = {
  "vendors/microlight": path.join(APP_SRC, "assets/vendors/microlight/microlight.ts"),
  "vendors/prism": path.join(APP_SRC, "assets/vendors/prism/prism.min.ts"),
} as const;

const vendors = Object.keys(vendorEntries).reduce<string[]>((acc, vendorEntry) => {
  acc.push(`${vendorEntry}.css`);
  acc.push(`${vendorEntry}.js`);
  return acc;
}, []);

const alias = createAliases(ASSETS_SRC, ASSETS_FILE_LIST);

const config = {
  MODE,
  __PROD__,
  __DEV__,

  distFolder,

  // webpack
  alias,
  vendorEntries,
  vendors,

  // paths
  APP_ROOT,
  APP_SRC,
  APP_DIST,
  PAGES_SRC,

  // files list
  ASSETS_FILE_LIST,

  // site
  port,
  siteUrl,
  author: pkg.author,
} as const;

module.exports = config;
export default config;
