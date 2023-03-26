// @ts-nocheck

function installHook(target) {
  if (target.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
    return null;
  }

  let targetConsole = console;
  let targetConsoleMethods = {};

  for (const method in console) {
    targetConsoleMethods[method] = console[method];
  }

  function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
    targetConsole = targetConsoleForTesting;
    targetConsoleMethods = {};

    for (const method in targetConsole) {
      targetConsoleMethods[method] = console[method];
    }
  }


  function formatWithStyles(inputArgs, style) {
    if (inputArgs === undefined || inputArgs === null || inputArgs.length === 0 || // Matches any of %c but not %%c
    typeof inputArgs[0] === 'string' && inputArgs[0].match(/([^%]|^)(%c)/g) || style === undefined) {
      return inputArgs;
    } // Matches any of %(o|O|d|i|s|f), but not %%(o|O|d|i|s|f)


    const REGEXP = /([^%]|^)((%%)*)(%([oOdisf]))/g;

    if (typeof inputArgs[0] === 'string' && inputArgs[0].match(REGEXP)) {
      return [`%c${inputArgs[0]}`, style, ...inputArgs.slice(1)];
    } else {
      const firstArg = inputArgs.reduce((formatStr, elem, i) => {
        if (i > 0) {
          formatStr += ' ';
        }

        switch (typeof elem) {
          case 'string':
          case 'boolean':
          case 'symbol':
            return formatStr += '%s';

          case 'number':
            const formatting = Number.isInteger(elem) ? '%i' : '%f';
            return formatStr += formatting;

          default:
            return formatStr += '%o';
        }
      }, '%c');
      return [firstArg, style, ...inputArgs];
    }
  }

  let unpatchFn = null; // NOTE: KEEP IN SYNC with src/backend/console.js:patchForStrictMode
  // This function hides or dims console logs during the initial double renderer
  // in Strict Mode. We need this function because during initial render,
  // React and DevTools are connecting and the renderer interface isn't avaiable
  // and we want to be able to have consistent logging behavior for double logs
  // during the initial renderer.

  function patchConsoleForInitialRenderInStrictMode({
    hideConsoleLogsInStrictMode,
    browserTheme
  }) {
    const overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    const originalConsoleMethods = {};

    unpatchFn = () => {
      for (const method in originalConsoleMethods) {
        try {
          targetConsole[method] = originalConsoleMethods[method];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(method => {
      try {
        const originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method];

        const overrideMethod = (...args) => {
          if (!hideConsoleLogsInStrictMode) {
            // Dim the text color of the double logs if we're not
            // hiding them.
            let color;

            switch (method) {
              case 'warn':
                color = browserTheme === 'light' ? "rgba(250, 180, 50, 0.75)" : "rgba(250, 180, 50, 0.5)";
                break;

              case 'error':
                color = browserTheme === 'light' ? "rgba(250, 123, 130, 0.75)" : "rgba(250, 123, 130, 0.5)";
                break;

              case 'log':
              default:
                color = browserTheme === 'light' ? "rgba(125, 125, 125, 0.75)" : "rgba(125, 125, 125, 0.5)";
                break;
            }

            if (color) {
              originalMethod(...formatWithStyles(args, `color: ${color}`));
            } else {
              throw Error('Console color is not defined');
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } // NOTE: KEEP IN SYNC with src/backend/console.js:unpatchForStrictMode


  function unpatchConsoleForInitialRenderInStrictMode() {
    if (unpatchFn !== null) {
      unpatchFn();
      unpatchFn = null;
    }
  }

  return hook;
}
