import { PlainObject } from './types.utils';

export const isArray = (payload: any): payload is any[] => Array.isArray(payload);

export const isString = (payload: any): payload is string => typeof payload === 'string';

export const isObject = (payload: any): payload is PlainObject => {
  return payload && typeof payload === 'object' && !isArray(payload);
};

export const isPromise = (payload: any): payload is Promise<any> => {
  return !!payload && (typeof payload === 'object' || typeof payload === 'function') && typeof payload?.then === 'function';
}
