export const isInt = (n: number): boolean => {
  return Number(n) === n && n % 1 === 0;
};

export const isFloat = (n: number): boolean => {
  return Number(n) === n && n % 1 !== 0;
};
