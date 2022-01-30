import { useState } from 'react';

const calc = (text: string) => {
  console.log(`${text} calc`);
  return 1;
};

const LazyInitialStateSample: React.FC = () => {
  const [initializedOnce, setInitializedOnce] = useState(() => calc('initializedOnce'));
  const [initializedMultiple, setInitializedMultiple] = useState(calc('initializedMultiple'));

  return (
    <>
      <div>{JSON.stringify({ initializedOnce, initializedMultiple }, null, 2)}</div>
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={() => setInitializedOnce((prev) => prev + 1)}>
          initializedOnce
        </button>
        <button type="button" className="btn btn-primary" onClick={() => setInitializedMultiple((prev) => prev + 1)}>
          initializedMultiple
        </button>
      </div>
    </>
  );
};

LazyInitialStateSample.displayName = 'LazyInitialStateSample';

export { LazyInitialStateSample };
