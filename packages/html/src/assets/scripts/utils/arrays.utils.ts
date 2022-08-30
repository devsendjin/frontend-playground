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
