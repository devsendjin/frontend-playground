export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/*
// another one
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I> ? Array<DeepPartial<I>> : DeepPartial<T[P]>;
};
*/

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
