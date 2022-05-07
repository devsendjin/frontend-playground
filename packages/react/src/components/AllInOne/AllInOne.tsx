import { routesMap } from '@/constants/routes';
import cn from 'classnames';
import styles from './AllInOne.module.scss';

const AllInOne: RFC = () => {
  return (
    <>
      {routesMap.map(({ category, routes }) => {
        return (
          <div className={styles['category']} key={category}>
            <h2 className={cn(styles['category'], styles['title'])}>{category}</h2>

            {routes &&
              routes.map((route) => {
                const Component = route.component;
                return (
                  <div key={route.name} className={styles['sample']}>
                    <h3 className="mb-3">{route.name}</h3>
                    <Component key={route.name} />
                  </div>
                );
              })}
          </div>
        );
      })}
    </>
  );
};

AllInOne.displayName = 'AllInOne';

export { AllInOne };
