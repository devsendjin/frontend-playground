import { HashRouter } from 'react-router-dom';
import cn from 'classnames';
import { outline } from '@/utils';
// import { Debug } from 'react-utils';
import { Aside } from '../sections/Aside';
import { Main } from '../sections/Main';
import styles from './App.module.scss';

// console.log(Debug);

const App = () => {
  return (
    <HashRouter>
      <button type="button" onClick={() => outline()} className={cn(styles['debug'], 'btn btn-light')}>
        outline
      </button>

      {/* <Debug data={{ some: 'other' }} /> */}

      <div className={styles['app-content']}>
        <Aside />

        <Main />
      </div>
    </HashRouter>
  );
};

export { App };
