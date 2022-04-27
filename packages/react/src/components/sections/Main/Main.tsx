import { Routes, Route } from 'react-router-dom';
import { componentMap, ROUTES } from '@/constants/routes';
import { AllInOne } from '@/components/AllInOne';
import { FrontView } from '@/components/FrontView';
import styles from './Main.module.scss';

const Main: RFC = () => {
  return (
    <main className={styles['main']}>
      <Routes>
        <Route path={ROUTES.root} element={<FrontView />} />
        <Route path={ROUTES.combined} element={<AllInOne />} />

        {componentMap.map((route) => {
          if (!route) return null;
          const { url, component: Component } = route;

          return <Route key={url} path={url} element={<Component />} />;
        })}
      </Routes>
    </main>
  );
};
Main.displayName = Main.name;

export { Main };
