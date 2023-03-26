export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

export const isString = (value: unknown): value is string => typeof value === "string";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => typeof value === "undefined";

// const isNonNullable = <T extends unknown>(value: T): value is NonNullable<T> => !isNull(value) && !isUndefined(value);

export const isNil = (value: unknown): value is null | undefined => isNull(value) || isUndefined(value);

export const isObject = (value: unknown) => value != null && typeof value === 'object' && !Array.isArray(value);
