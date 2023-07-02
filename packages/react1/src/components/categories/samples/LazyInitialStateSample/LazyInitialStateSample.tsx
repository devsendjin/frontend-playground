import React from "react";
import { Button } from "@/vendors/bootstrap";

const calc = (text: string) => {
  console.group("LazyInitialStateSample");
  console.log(`${text} calc`);
  console.groupEnd();
  return 1;
};

const LazyInitialStateSample: RFC = () => {
  const [initializedOnce, setInitializedOnce] = React.useState(() => calc("initializedOnce"));
  const [initializedMultiple, setInitializedMultiple] = React.useState(calc("initializedMultiple"));

  return (
    <>
      <div>{JSON.stringify({ initializedOnce, initializedMultiple }, null, 2)}</div>
      <div className='btn-group'>
        <Button
          type='button'
          className='btn btn-light'
          onClick={() => setInitializedOnce((prev) => prev + 1)}
          variant='light'>
          initializedOnce
        </Button>
        <Button
          type='button'
          className='btn btn-light'
          onClick={() => setInitializedMultiple((prev) => prev + 1)}
          variant='light'>
          initializedMultiple
        </Button>
      </div>
    </>
  );
};

LazyInitialStateSample.displayName = "LazyInitialStateSample";

export { LazyInitialStateSample };
