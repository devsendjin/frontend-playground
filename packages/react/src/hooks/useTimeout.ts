import { useEffect } from 'react';
import { useSafeSetState } from './useSafeSetState';

const useTimeout = (ms = 0, key = '') => {
  const [ready, setReady] = useSafeSetState(false);

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
