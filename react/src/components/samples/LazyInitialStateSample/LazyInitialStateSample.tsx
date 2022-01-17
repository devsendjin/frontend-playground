import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const calc = (text: string) => {
  console.log(`${text} calc`);
  return 1;
};

const LazyInitialStateSample: React.FC = () => {
  const [initializedOnce, setInitializedOnce] = useState(() => calc('initializedOnce'));
  const [initializedMultiple, setInitializedMultiple] = useState(calc('initializedMultiple'));

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="4">
          <div>{JSON.stringify({ initializedOnce, initializedMultiple }, null, 2)}</div>
          <div className="btn-group">
            <button type="button" className="btn btn-primary" onClick={() => setInitializedOnce((prev) => prev + 1)}>
              initializedOnce
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setInitializedMultiple((prev) => prev + 1)}
            >
              initializedMultiple
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

LazyInitialStateSample.displayName = 'LazyInitialStateSample';

export { LazyInitialStateSample };
