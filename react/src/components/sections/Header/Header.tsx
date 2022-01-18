import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { ROUTES } from '@/constants/routes';

const Header = () => {
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <Button as="div" variant="dark" className="position-relative w-100">
              <Link className="d-block text-white" to={ROUTES.root}>
                Playground
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export { Header };
