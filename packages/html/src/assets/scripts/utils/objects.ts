/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

type TMergedObject = { [key: string]: any };
/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const mergeDeep = (target: TMergedObject, ...sources: Array<TMergedObject>) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          // [key]: typeof source[key] === 'string' ? [target[key], source[key]].join(' ') : source[key], // with strings concatenated
          [key]: source[key],
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
};
