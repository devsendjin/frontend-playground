import { useEffect, useRef } from 'react';

const usePreviousState = <T>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export { usePreviousState };
