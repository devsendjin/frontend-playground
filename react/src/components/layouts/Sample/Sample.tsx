import { Container, Row, Col } from 'react-bootstrap';
import cn from 'classnames';
import styles from './Sample.module.scss';

const SampleCol: React.FC<{ col?: number }> = ({ children, col }) => {
  return <Col xs={col}>{children}</Col>;
};

const Sample: React.FC & { Col: typeof SampleCol } = ({ children }) => {
  return (
    <Container className={styles['container']} fluid>
      <Row className={cn('justify-content-center', styles['row'])}>{children}</Row>
    </Container>
  );
};

Sample.Col = SampleCol;

export { Sample };
