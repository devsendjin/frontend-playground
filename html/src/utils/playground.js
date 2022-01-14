export const scope = (callback, { dividerAtStart = '\n\n', name = 'Scope' } = {}) => {
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
export const l = (obj) => {
  if (!obj || Array.isArray(obj)) {
    return console.log(obj);
  }

  const logArgs = Object.entries(obj).reduce((acc, [key, value], index) => {
    if (index === 0) {
      acc.push(`${key}: `, value);
    } else {
      acc.push(`\n${key}: `, value);
    }
    return acc;
  }, []);

  console.log(...logArgs);
};
