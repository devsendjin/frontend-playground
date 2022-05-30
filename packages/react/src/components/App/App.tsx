import { HashRouter } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '@/vendors/bootstrap';
import { outline } from '@/utils';
// import { Debug } from 'react-utils';
import { Aside } from '../sections/Aside';
import { Main } from '../sections/Main';
import styles from './App.module.scss';

// console.log(Debug);

const App = () => {
  return (
    <HashRouter>
      <Button type="button" onClick={() => outline()} className={styles['debug']} variant="light">
        outline
      </Button>

      {/* <Debug data={{ some: 'other' }} /> */}

      <div className={styles['app-content']}>
        <Aside />

        <Main />
      </div>
    </HashRouter>
  );
};

export { App };
