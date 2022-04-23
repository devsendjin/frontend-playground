import { Routes, Route } from 'react-router-dom';
import { componentMap, ROUTES } from '@/constants/routes';
import { AllInOne } from '@/components/AllInOne';
import { FrontView } from '@/components/FrontView';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <main className={styles['main']}>
      <Routes>
        <Route path={ROUTES.root} element={<FrontView />} />
        <Route path={ROUTES.combined} element={<AllInOne />} />

        {componentMap.map(({ route, component: Component }) => (
          <Route key={route} path={route} element={<Component />} />
        ))}
      </Routes>
    </main>
  );
};

export { Main };
