import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { componentMap, ROUTES } from '@/constants/routes';
import { Samples } from '../sections/Samples';

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Container>
          <Row>
            <Col>
              <Button as="div" variant="dark" className="position-relative w-100">
                <Link className="d-block text-white" to={ROUTES.root}>
                  /
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      <main className="mt-3">
        <Routes>
          <Route path={ROUTES.root} element={<Samples />} />
          {componentMap.map(({ route, component: Component }) => (
            <Route key={route} path={route} element={<Component />} />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export { App };
