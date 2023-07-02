import path from "path";
import fs from "fs";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

// import legacy from '@vitejs/plugin-legacy';

// import { babel } from '@rollup/plugin-babel';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

// import babelCore from "@babel/core";



// import hashSum from "hash-sum";

const APP_SRC = path.resolve(process.cwd(), "src");

enum Mode {
  development = "development",
  production = "production",
}

export default defineConfig(({ mode }) => {
  const isDev = mode === Mode.development;
  const isProd = mode === Mode.production;

  return {
    plugins: [
      react(),
      // replace with https://github.com/rollup/plugins/tree/master/packages/babel in rollupOptions section
      // legacy(),

      // {
      //   name: 'my-build-end-plugin',
      //   buildEnd: () => {
      //     console.log(fs.readdirSync(path.join(process.cwd(), "dist/js")));
      //   },
      // },
      //   {
      //   babel: {
      //     presets: [
      //       [
      //         '@babel/preset-env',
      //         {
      //           bugfixes: true,
      //           debug: false,
      //           spec: false,
      //           loose: false,
      //           modules: 'auto',
      //           useBuiltIns: false,
      //         },
      //       ],
      //       [
      //         "@babel/preset-react",
      //         {
      //           runtime: "automatic",
      //           development: isDev,
      //           useBuiltIns: false,
      //         }
      //       ]
      //     ],
      //     babelrc: false, // Use .babelrc files
      //     configFile: false, // Use babel.config.js files
      //   }
      // },
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        "@": APP_SRC,
        "@UI": path.resolve(APP_SRC, "components/UI"),
        "@images": path.resolve(APP_SRC, "assets/images"),
        "@styles": path.resolve(APP_SRC, "assets/styles"),
      },
    },
    publicDir: "./public",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/assets/styles/abstracts";`,
        },
      },
      modules: {
        scopeBehaviour: "local",
        hashPrefix: "prefix",
        generateScopedName: isDev ? "[local]--[folder]--[hash:base64:3]" : "[hash:base64:6]",
        // generateScopedName(name, filename, css) {
        //   const shortHash = hashSum(css).slice(-8);
        //   const filePath = filename.split("src/")[1];
        //   const fileName = filePath.split(".")[0];
        //   // const classNameLong = fileName.replace(/\//g, "_");
        //   const filePathParts = filePath.split(".")[0].split("/");
        //   const componentName = filePathParts[filePathParts.length - 1];

        //   // console.log({
        //     // 'filename.split("src/")': filename.split("src/"),
        //     // 'filePath.split(".")': filePath.split("."),
        //     // 'filePath.split(".")[0]': filePath.split(".")[0],
        //     // 'filePath.split(".")[0].split("/")': filePath.split(".")[0].split("/"),
        //     // 'n[n.length - 1]': n[n.length - 1],
        //     // 'fileName.replace(/\//g, "_")': fileName.replace(/\//g, "_"),
        //   //   [`${name}-${componentName}-${shortHash}`]: `${name}-${componentName}-${shortHash}`,
        //   //   classNameLong,
        //   //   componentName,
        //   //   name,
        //   //   filename,
        //   // });

        //   return `${componentName}-${name}-${shortHash}`;
        // },
      },
      postcss: {
        plugins: [postcssPresetEnv({ stage: 4 }), postcssFlexbugsFixes, autoprefixer],
      },
      devSourcemap: isDev,
    },
    define: {
      __DEV__: isDev,
      __PROD__: isProd,
    },
    build: {
      emptyOutDir: true,
      minify: isProd ? "terser" : false,
      terserOptions: isProd
        ? {
            format: { comments: false },
          }
        : undefined,
      sourcemap: isDev,
      target: ["ES2020"],
      rollupOptions: {
        input: "src/index.tsx",
        output: {
          dir: "dist",
          exports: "auto",
          format: "es",
          interop: "auto", // TS behavior
          inlineDynamicImports: false,
          externalLiveBindings: false,
          // path relative to output.dir
          assetFileNames: (chunkInfo) => {
            if (typeof chunkInfo.name === "string" && /index\.css/gi.test(chunkInfo.name)) {
              return "assets/bundle.css";
            }
            return "assets/[name][extname]";
          },
          // path relative to output.dir
          chunkFileNames: (chunkInfo) => {
            return "js/[name].js";
          },
          // path relative to output.dir
          entryFileNames: (chunkInfo) => {
            if (/index/gi.test(chunkInfo.name)) {
              return "js/bundle.js";
            }
            return "js/[name].js";
          },
          // path relative to entryFileNames
          manualChunks: (id) => {
            // if (/legacy/gi.test(id)) {
            //   console.log(id);

            //   // return null;
            // }

            if (/\/node_modules\/(react|react-dom)\//gi.test(id)) {
              return "vendor";
            }
          },
        },
        plugins: [
          commonjs(),
          resolve(),
          getBabelOutputPlugin({ presets: ['@babel/preset-env'] })
          // babel({ babelHelpers: 'bundled' })
        ],
      },
    },
    server: {
      port: 3000,
      open: false,
    },
  };
});
