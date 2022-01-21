// ============== object ==============
type TInvertObject = <T extends Record<PropertyKey, PropertyKey>>(
  obj: T
) => {
  [K in keyof T as T[K]]: K;
};
export const invertObject: TInvertObject = (obj) => {
  return Object.fromEntries(Object.entries(obj).map((a) => a.reverse()));
};
