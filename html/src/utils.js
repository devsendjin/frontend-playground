const isInt = (n) => {
  return Number(n) === n && n % 1 === 0;
};

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

export { isInt, isFloat };
