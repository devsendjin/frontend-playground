import { Container } from 'react-bootstrap';
import cn from 'classnames';
import { BsCard } from '@/components/UI/BsCard';
import { samplesMap } from '@/constants/routes';
import styles from './SampleList.module.scss';
import React from 'react';

const SampleList = () => {
  return (
    <Container>
      <div className={styles['sample-list']}>
        {samplesMap.map(({ category, routes }) => (
          <React.Fragment key={category}>
            <h2 className={cn('mb-0', styles['title'])}>{category}</h2>
            <div className={styles['grid']}>
              {routes.map((route) => (
                <BsCard key={route.name} to={route.route}>
                  {route.name}
                </BsCard>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export { SampleList };
