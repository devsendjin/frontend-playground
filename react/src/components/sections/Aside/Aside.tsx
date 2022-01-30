import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, samplesMap } from '@/constants/routes';
import styles from './Aside.module.scss';

const Aside = () => {
  return (
    <aside className={styles['aside']}>
      <Link to={ROUTES.root} className={styles['top-link']}>
        Playground
      </Link>

      <Link to={ROUTES.combined} className={styles['top-link']}>
        All in one
      </Link>

      {samplesMap.map(({ category, routes }) => (
        <React.Fragment key={category}>
          <div>{category}</div>
          <div className={styles['link-group']}>
            {routes.map((route) => (
              <Link key={route.name} to={route.route} className={styles['link-group-item']}>
                {route.name}
              </Link>
            ))}
          </div>
        </React.Fragment>
      ))}
    </aside>
  );
};

export { Aside };
