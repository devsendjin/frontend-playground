import { BrowserRouter } from 'react-router-dom';
import cn from 'classnames';
// import { Debug } from 'react-utils';
import { Aside } from '../sections/Aside';
import { Main } from '../sections/Main';
import styles from './App.module.scss';

// console.log(Debug);

import { outline } from '@/utils';

const App = () => {
  return (
    <BrowserRouter>
      <button type="button" onClick={() => outline()} className={cn(styles['debug'], 'btn btn-primary')}>
        outline
      </button>

      {/* <Debug data={{ some: 'other' }} /> */}

      <div className={styles['app-content']}>
        <Aside />

        <Main />
      </div>
    </BrowserRouter>
  );
};

export { App };
