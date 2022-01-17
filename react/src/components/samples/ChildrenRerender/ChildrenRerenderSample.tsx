import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

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
    <Container>
      <Row className="justify-content-center">
        <Col xs="4">
          <ChildrenRerender>
            <Child />
          </ChildrenRerender>
        </Col>
      </Row>
    </Container>
  );
};

ChildrenRerenderSample.displayName = 'ChildrenRerenderSample';

export { ChildrenRerenderSample };
