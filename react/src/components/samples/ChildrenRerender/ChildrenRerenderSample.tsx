import { useState } from 'react';
import { Sample } from '@/components/layouts/Sample';

const Child: React.FC = () => {
  console.log('Child render');
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
    <Sample>
      <ChildrenRerender>
        <Child />
      </ChildrenRerender>
    </Sample>
  );
};

ChildrenRerenderSample.displayName = 'ChildrenRerenderSample';

export { ChildrenRerenderSample };
