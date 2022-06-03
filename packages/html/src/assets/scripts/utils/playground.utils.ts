export const scope = (
  callback: any,
  scopeName: string = 'Scope',
  { divider = '' }: { divider?: boolean | string } = {}
) => {
  if (divider) console.log(divider);
  console.group(scopeName);
  if (callback) callback();
  console.groupEnd();
};
/**
 * modified console.log
 * @param {Object} vards
 * @returns [string, any]
 */
export const l = (vars: any): void => {
  if (!vars || Array.isArray(vars)) {
    return console.log(vars);
  }

  // @ts-ignore
  const logArgs = Object.entries(vars).reduce((acc: any, [key, value], index) => {
    if (index === 0) {
      acc.push(`${key}: `, value);
    } else {
      acc.push(`\n${key}: `, value);
    }
    return acc;
  }, []);

  console.log(...logArgs);
};
