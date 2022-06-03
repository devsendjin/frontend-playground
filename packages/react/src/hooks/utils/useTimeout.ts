import { useEffect } from 'react';
import { useSafeState } from './useSafeState';

const useTimeout = (ms = 0, key = '') => {
  const [ready, setReady] = useSafeState(false);

  useEffect(() => {
    setReady(false);
    let timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [key, ms, setReady]);

  return ready;
};

export { useTimeout };
