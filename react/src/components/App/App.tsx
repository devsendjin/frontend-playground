import { BrowserRouter } from 'react-router-dom';
import { DynamicFieldsSample } from '@/components/samples/DynamicFieldsSample';
import { Card } from '@/components/UI/Card';
import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Immer /> */}
        <DynamicFieldsSample />
        {/* <DynamicStateControllerSample /> */}
        <section className={styles['card-list']}>
          <Card>
            <span>Lorem</span>
          </Card>
        </section>
      </div>
    </BrowserRouter>
  );
};

export { App };
