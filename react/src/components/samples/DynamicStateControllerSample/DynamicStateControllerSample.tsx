import { Container, Row, Col, Form } from 'react-bootstrap';
import { DynamicStateController } from '@/components/features/DynamicStateController';

const DynamicStateControllerSample: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="4">
          <DynamicStateController<string>
            defaultState=""
            render={({ state: [value, setValue] }) => (
              <>
                <p>DynamicStateController sample | {value}</p>
                <Form.Control
                  type="text"
                  placeholder="Enter text"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
                />
              </>
            )}
          />
        </Col>
      </Row>
    </Container>
  );
};

DynamicStateControllerSample.displayName = 'DynamicStateControllerSample';

export { DynamicStateControllerSample };
