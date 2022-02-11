import { useState } from 'react';

const Child: React.FC = () => {
  console.group('ChildrenRerenderSample');
  console.log('Child render');
  console.groupEnd();
  return <div>Child</div>;
};

const ChildrenRerender: React.FC = ({ children }) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <div>
      <div>state {state}</div>
      <button type="button" className="btn btn-primary" onClick={() => setState((prev) => !prev)}>
        Trigger
      </button>
      {children}
    </div>
  );
};

const ChildrenRerenderSample: React.FC = () => {
  return (
    <ChildrenRerender>
      <Child />
    </ChildrenRerender>
  );
};

ChildrenRerenderSample.displayName = 'ChildrenRerenderSample';

export { ChildrenRerenderSample };
