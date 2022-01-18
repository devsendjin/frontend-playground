import { Container, Row, Col } from 'react-bootstrap';

const Sample: React.FC = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="4">{children}</Col>
      </Row>
    </Container>
  );
};

export { Sample };
