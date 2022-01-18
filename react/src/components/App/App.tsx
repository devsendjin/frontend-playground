import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { componentMap, ROUTES } from '@/constants/routes';
import { Header } from '../sections/Header';
import { Samples } from '../sections/Samples';
// import { outline } from '@@/shared/scripts/debug';
// import { outline } from '../../../../shared/scripts/debug';
// import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      {/* <button type="button" onClick={() => outline()} className={styles['debug']}>
        debug
      </button> */}
      <Header />

      <main className="mt-3">
        <Routes>
          <Route path={ROUTES.root} element={<Samples />} />

          {componentMap.map(({ route, component: Component }) => (
            <Route key={route} path={route} element={<Component />} />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export { App };
