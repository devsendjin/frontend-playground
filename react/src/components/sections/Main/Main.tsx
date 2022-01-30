import { Routes, Route } from 'react-router-dom';
import { componentMap, ROUTES } from '@/constants/routes';
import styles from './Main.module.scss';
import { AllInOne } from '@/components/AllInOne';

const Main = () => {
  return (
    <main className={styles['main']}>
      <Routes>
        <Route path={ROUTES.root} element={<div>Playground</div>} />
        <Route path={ROUTES.combined} element={<AllInOne />} />

        {componentMap.map(({ route, component: Component }) => (
          <Route key={route} path={route} element={<Component />} />
        ))}
      </Routes>
    </main>
  );
};

export { Main };
