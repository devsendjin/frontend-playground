import { BrowserRouter } from 'react-router-dom';
import { DynamicFields } from '@/components/samples/DynamicFields';
import { Card } from '@/components/UI/Card';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Immer /> */}
        <DynamicFields />
        {/* <DynamicStateControllerSample /> */}
        <Card>
          <span>Card</span>
        </Card>
      </div>
    </BrowserRouter>
  );
};

export { App };
