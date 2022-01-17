import { Container } from 'react-bootstrap';
import { BsCard } from '@/components/UI/BsCard';
import { componentMap } from '@/constants/routes';
import styles from './Samples.module.scss';

const Samples = () => {
  return (
    <Container>
      <div className={styles['grid']}>
        {componentMap.map(({ route, component: Component }) => (
          <BsCard key={route} to={route}>
            {Component.displayName}
          </BsCard>
        ))}
      </div>
    </Container>
  );
};

export { Samples };
