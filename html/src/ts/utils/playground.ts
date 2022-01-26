type TScope = (callback: any, options: { dividerAtStart?: boolean | string; name?: string }) => void;
export const scope: TScope = (callback, { dividerAtStart = '\n\n', name = 'Scope' } = {}) => {
  if (dividerAtStart) console.log(dividerAtStart);
  console.group(name);
  if (callback) callback();
  console.groupEnd();
};

/**
 * modified console.log
 * @param {Object} obj
 * @returns [string, any]
 */
type TL = (obj: any) => void;
export const l: TL = (obj) => {
  if (!obj || Array.isArray(obj)) {
    return console.log(obj);
  }

  // @ts-ignore
  const logArgs = Object.entries(obj).reduce((acc: any, [key, value], index) => {
    if (index === 0) {
      acc.push(`${key}: `, value);
    } else {
      acc.push(`\n${key}: `, value);
    }
    return acc;
  }, []);

  console.log(...logArgs);
};
