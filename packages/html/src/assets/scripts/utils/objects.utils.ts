import { PlainObject } from './types.utils';
import { ArrayMergeOptions, mergeArrays } from './arrays.utils';
import { isArray, isObject, isString } from './type-check.utils';

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export const mergeDeep1 = (target: PlainObject, ...sources: Array<PlainObject>) => {
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
  return mergeDeep1(target, ...sources);
};

type MergeOptions = {
  arrayMergeOptions?: ArrayMergeOptions & {
    concatenate?: boolean;
    arrayMerger?: (targetArray: any[], sourceArray: any[]) => any[];
  };
  stringMergeOptions?: {
    concatenate?: boolean;
    stringMerger?: (targetString: string, sourceString: string) => string;
  };
};
export const mergeDeep = (options: MergeOptions = {}, target: PlainObject, ...sources: PlainObject[]) => {
  if (!sources.length) return target;

  const { arrayMergeOptions = {}, stringMergeOptions = {} } = options;
  const { arrayMerger, ...restArrayMergeOptions } = arrayMergeOptions;
  const { concatenate: concatenateArrays } = restArrayMergeOptions;

  const { concatenate: concatenateString, stringMerger } = stringMergeOptions;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: source[key] });
        }
        mergeDeep(options, target[key], source[key]);
      } else {
        let value = source[key];

        if (concatenateArrays && isArray(target[key]) && isArray(source[key])) {
          if (arrayMerger) {
            value = arrayMerger(target[key], source[key]);
          } else {
            value = mergeArrays(restArrayMergeOptions, target[key], source[key]);
          }
        }

        if (concatenateString && isString(target[key]) && isString(source[key])) {
          value = stringMerger ? stringMerger(target[key], source[key]) : target[key].concat(source[key]);
        }

        Object.assign(target, { [key]: value });
      }
    }
  }

  return mergeDeep(options, target, ...sources);
};

type TInvertObject = <T extends Record<PropertyKey, PropertyKey>>(
  obj: T
) => {
  [K in keyof T as T[K]]: K;
};
export const invertObject: TInvertObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
};
