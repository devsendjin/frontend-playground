import React from 'react';

type Key = string;
type Options = Partial<{ serialize: typeof JSON.stringify; deserialize: typeof JSON.parse }>;

const useLocalStorageState = <State = unknown, DefaultState = State | (() => State)>(
  key: Key,
  defaultValue: DefaultState,
  { serialize = JSON.stringify, deserialize = JSON.parse }: Options = {}
): [State, React.Dispatch<React.SetStateAction<State>>] => {
  const [state, setState] = React.useState<State>(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return deserialize(value);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef<Key>(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(key);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
};

export { useLocalStorageState };
