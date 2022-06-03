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
