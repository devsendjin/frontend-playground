// @ts-nocheck
// TODO: add types
export const chunk = (arr: Arary<any>, size) => {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) {
      acc.push(arr.slice(i, i + size));
    }
    return acc;
  }, []);
};

export const replaceAt = (arr, atIndex, replacer) => {
  const copy = arr.slice();
  copy.splice(atIndex, 1, replacer);
  return copy;
};

export const randomItemFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
}

export function findLast<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
  const foundIndex = findLastIndex<T>(array, predicate);

  return foundIndex === -1 ? undefined : array[foundIndex];
}

enum ArrayMergeStrategy {
  'groupSimilar' = 'groupSimilar',
  'prepend' = 'prepend',
  'append' = 'append',
}
export type ArrayMergeOptions = {
  strategy?: ArrayMergeStrategy;
  makeUniq?: boolean;
};
export const mergeArrays = (options: ArrayMergeOptions = {}, targetArray: any[], sourceArray: any[]): any[] => {
  const { strategy = ArrayMergeStrategy.append, makeUniq } = options;
  let merged;

  if (strategy === ArrayMergeStrategy.groupSimilar) {
    const sourceValueIndexMap = new Map<any, Set<number>>();
    sourceArray.forEach((sourceItem, index) => {
      if (sourceValueIndexMap.has(sourceItem)) {
        const previousIndexSet = sourceValueIndexMap.get(sourceItem);
        if (previousIndexSet) {
          sourceValueIndexMap.set(sourceItem, previousIndexSet.add(index));
          return;
        }
      }
      sourceValueIndexMap.set(sourceItem, new Set([index]));
    });

    const arraysDifference = sourceArray.filter((value) => !targetArray.includes(value));
    merged = targetArray.reduce((acc, value) => {
      if (sourceValueIndexMap.has(value)) {
        const sourceIndexes = sourceValueIndexMap.get(value);
        if (sourceIndexes) {
          const sourceIndexesArray = Array.from(sourceIndexes);
          const [minSourceIndex, maxSourceIndex] =
            sourceIndexesArray.length === 1
              ? [sourceIndexesArray[0], -1]
              : sourceIndexesArray.length === 2
              ? [sourceIndexesArray[0], sourceIndexesArray[1]]
              : [-1, -1];

          if (minSourceIndex !== -1 || maxSourceIndex !== -1) {
            acc.push(value, value);
            return acc;
          }
        }
      }
      acc.push(value);
      return acc;
    }, []);
    merged = merged.concat(arraysDifference);
  }

  if (strategy === ArrayMergeStrategy.prepend) {
    merged = sourceArray.concat(targetArray);
  }

  if (strategy === ArrayMergeStrategy.append) {
    merged = targetArray.concat(sourceArray);
  }

  if (makeUniq) {
    merged = Array.from(new Set(merged));
  }

  return merged;
};
