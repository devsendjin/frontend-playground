// ====================
// arrays
// ====================
export const chunk = (arr, size) => {
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

// ====================
// numbers
// ====================
export const isInt = (n) => {
  return Number(n) === n && n % 1 === 0;
};

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

// ====================
// other
// ====================
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
