const safeParseInt = (value: string, defaultValue: number = 0): number => {
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};


const safeParseFloat = (value: string, defaultValue: number = 0.0): number => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};
