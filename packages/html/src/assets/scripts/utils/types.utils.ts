export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadOnly<T> = {
  readonly [P in keyof T]?: DeepReadOnly<T[P]>;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type PlainObject = { [key: string]: any };
