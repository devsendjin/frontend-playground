import React from 'react';
import { routesMap } from '@/constants/routes';
import styles from './AllInOne.module.scss';

const AllInOne: RFC = () => {
  return (
    <>
      {routesMap.map(({ category, routes }) => (
        <React.Fragment key={category}>
          <h2 className={styles['category']}>{category}</h2>
          <div className="mt-1">
            {routes &&
              routes.map((route) => {
                const Component = route.component;
                return (
                  <React.Fragment key={route.name}>
                    <hr className={styles['hr']} />
                    <h5 className="mb-3">{route.name}</h5>
                    <Component key={route.name} />
                  </React.Fragment>
                );
              })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

AllInOne.displayName = 'AllInOne';

export { AllInOne };
