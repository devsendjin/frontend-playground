import React from 'react';
import { Button } from '@/vendors/bootstrap';

const Child: RFC = () => {
  console.group('ChildrenRerenderSample');
  console.log('Child render');
  console.groupEnd();
  return <div>Child</div>;
};

const ChildrenRerender: RFC = ({ children }) => {
  const [state, setState] = React.useState<boolean>(false);

  return (
    <div>
      <div>state {state}</div>
      <Button type="button" onClick={() => setState((prev) => !prev)} variant="light">
        Trigger
      </Button>
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
