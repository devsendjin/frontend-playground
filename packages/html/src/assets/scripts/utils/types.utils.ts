export type Negatives = null | undefined;

export type Primitives = number | string | boolean | bigint | Negatives;

export type PickByValueType<T, ValueType extends Primitives> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? Key : never }[keyof T]
>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadOnly<T> = {
  readonly [P in keyof T]?: DeepReadOnly<T[P]>;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type PlainObject = { [key: string]: any };
