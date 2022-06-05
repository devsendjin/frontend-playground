import cn from 'classnames';
import { Col, Row } from '@/components/UI/FlexGrid';
import styles from './FlexGridSample.module.scss';

type FlexGridSampleProps = {
  className?: string;
};

const FlexGridSample: RFC<FlexGridSampleProps> = ({ className }) => {
  return (
    <div className={cn(styles['flex-grid-sample'], className)}>
      <div className={styles['container']}>
        <Row className={styles['row']} colGap={15} rowGap={30}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} className={styles['col']} size={index + 1}>
              <div>Col {index + 1}</div>
            </Col>
          ))}
        </Row>

        <Row className={styles['row']} colGap={15}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Col key={index} className={styles['col']} size={2}>
              <div>Col {index + 1}</div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export { FlexGridSample };
