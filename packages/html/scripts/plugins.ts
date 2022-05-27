import { Compiler } from 'webpack';

// plugin help
// https://www.mo4tech.com/webpack-5-compilation-processassets-hook.html
type TOptions = {
  deleteByAssetPath?: (assetPath: string) => boolean;
  deleteByAssetContent?: (assetContent: string | Buffer) => boolean;
  debug?: boolean;
};
const PLUGIN_NAME = 'omit-generating-files';

class OmitGeneratingFilesPlugin {
  constructor(private options?: TOptions) {
    const defaultOptions: TOptions = {
      debug: false,
      deleteByAssetPath: () => false,
      deleteByAssetContent: () => false,
    };
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  apply = (compiler: Compiler) => {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      if (this.options?.deleteByAssetPath) {
        compilation.hooks.processAssets.tapAsync(
          {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          (assetsObj, callback) => {
            const assets = Object.keys(assetsObj);

            if (this.options?.debug) {
              console.log('\n\ncompiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL\n', { assets });
            }
            assets.forEach((assetPath) => {
              if (
                (this.options?.deleteByAssetPath && this.options.deleteByAssetPath(assetPath)) ||
                (this.options?.deleteByAssetContent && this.options.deleteByAssetContent(assetPath))
              ) {
                compilation.deleteAsset(assetPath);
              }
            });
            callback();
          }
        );
      }

      if (this.options?.deleteByAssetContent) {
        compilation.hooks.processAssets.tapAsync(
          {
            name: PLUGIN_NAME,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
          },
          (assetsObj, callback) => {
            const assets = Object.keys(assetsObj);

            if (this.options?.debug) {
              console.log('\n\ncompiler.webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING\n', { assets });
            }

            assets.forEach((assetPath) => {
              if (
                this.options?.deleteByAssetContent &&
                this.options.deleteByAssetContent(assetsObj[assetPath].source())
              ) {
                compilation.deleteAsset(assetPath);
              }
            });
            callback();
          }
        );
      }
    });
  };
}

export { OmitGeneratingFilesPlugin };
