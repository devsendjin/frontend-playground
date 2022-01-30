import { BrowserRouter } from 'react-router-dom';
import { Aside } from '../sections/Aside';
import { Main } from '../sections/Main';
import styles from './App.module.scss';

// import { outline } from '@@/shared/scripts/debug';
// import { outline } from '../../../../shared/scripts/debug';
// import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      {/* <button type="button" onClick={() => outline()} className={styles['debug']}>
        debug
      </button> */}
      <div className={styles['app-content']}>
        <Aside />

        <Main />
      </div>
    </BrowserRouter>
  );
};

export { App };
