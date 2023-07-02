// type Callback<Params extends unknown[]> = (...args: Params) => void;
// const callAll = <Params extends unknown[]>(...fns: Array<Callback<Params> | undefined>) => {
const callAll = <Params extends unknown[]>(...fns: unknown[]) => {
  return (...args: Params) => {
    return fns.forEach((fn) => {
      if (fn && typeof fn === 'function') {
        fn(...args);
      }
    });
  };
};

export { callAll };
