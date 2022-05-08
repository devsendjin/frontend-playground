// https://github.com/kentcdodds/react-hooks/blob/main/src/examples/hook-flow.js
import React from 'react';

const Child: RFC = () => {
  console.log('%c    Child: render start', 'color: MediumSpringGreen');

  const [count, setCount] = React.useState(() => {
    console.log('%c    Child: useState(() => 0)', 'color: tomato');
    return 0;
  });

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {})', 'color: LightCoral');
    return () => {
      console.log('%c    Child: useEffect(() => {}) cleanup 🧹', 'color: LightCoral');
    };
  });

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {}, [])', 'color: MediumTurquoise');
    return () => {
      console.log('%c    Child: useEffect(() => {}, []) cleanup 🧹', 'color: MediumTurquoise');
    };
  }, []);

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {}, [count])', 'color: HotPink');
    return () => {
      console.log('%c    Child: useEffect(() => {}, [count]) cleanup 🧹', 'color: HotPink');
    };
  }, [count]);

  const element = (
    <button className="btn btn-light" onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log('%c    Child: render end', 'color: MediumSpringGreen');

  return element;
};

const HookFlowSample: RFC = () => {
  console.log('%cHookFlowSample: render start', 'color: MediumSpringGreen');

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cHookFlowSample: useState(() => false)', 'color: tomato');
    return false;
  });

  React.useEffect(() => {
    console.log('%cHookFlowSample: useEffect(() => {})', 'color: LightCoral');
    return () => {
      console.log('%cHookFlowSample: useEffect(() => {}) cleanup 🧹', 'color: LightCoral');
    };
  });

  React.useEffect(() => {
    console.log('%cHookFlowSample: useEffect(() => {}, [])', 'color: MediumTurquoise');
    return () => {
      console.log('%cHookFlowSample: useEffect(() => {}, []) cleanup 🧹', 'color: MediumTurquoise');
    };
  }, []);

  React.useEffect(() => {
    console.log('%cHookFlowSample: useEffect(() => {}, [showChild])', 'color: HotPink');
    return () => {
      console.log('%cHookFlowSample: useEffect(() => {}, [showChild]) cleanup 🧹', 'color: HotPink');
    };
  }, [showChild]);

  const element = (
    <>
      <label>
        <input type="checkbox" checked={showChild} onChange={(e) => setShowChild(e.target.checked)} /> show child
      </label>
      <br />
      <div
        style={{
          padding: 10,
          margin: 10,
          // height: 50,
          // width: 50,
          display: 'inline-flex',
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  );

  console.log('%cHookFlowSample: render end', 'color: MediumSpringGreen');

  return element;
};

export { HookFlowSample };
