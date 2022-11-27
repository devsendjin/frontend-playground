export type Negatives = null | undefined;

export type Primitives = number | string | boolean | bigint | Negatives;

export type ObjectValues<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// React relative
export type ExtractComponent<Type> = Type extends React.FC<infer X> ? X : never;
