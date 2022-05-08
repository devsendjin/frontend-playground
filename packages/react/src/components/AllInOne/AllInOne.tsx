import { routesMap } from '@/constants/routes';
import cn from 'classnames';
import styles from './AllInOne.module.scss';
import { CategoryTitle, SampleTitle } from '@UI/playground/Title';

const AllInOne: RFC = () => {
  return (
    <>
      {routesMap.map(({ category, routes }) => {
        return (
          <div className={styles['category']} key={category}>
            <CategoryTitle className={cn(styles['category'], styles['title'])}>{category}</CategoryTitle>

            {routes &&
              routes.map((route) => {
                const Component = route.component;
                return (
                  <div key={route.name} className={styles['sample']}>
                    <SampleTitle className="mb-3">{route.name}</SampleTitle>
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
