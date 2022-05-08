import { useState } from 'react';

const Child: RFC = () => {
  console.group('ChildrenRerenderSample');
  console.log('Child render');
  console.groupEnd();
  return <div>Child</div>;
};

const ChildrenRerender: RFC = ({ children }) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <div>
      <div>state {state}</div>
      <button type="button" className="btn btn-light" onClick={() => setState((prev) => !prev)}>
        Trigger
      </button>
      {children}
    </div>
  );
};
ChildrenRerender.displayName = ChildrenRerender.name;

const ChildrenRerenderSample: RFC = () => {
  return (
    <ChildrenRerender>
      <Child />
    </ChildrenRerender>
  );
};
ChildrenRerenderSample.displayName = 'ChildrenRerenderSample';

export { ChildrenRerenderSample };
