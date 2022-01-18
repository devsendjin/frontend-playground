import { Form } from 'react-bootstrap';
import { DynamicStateController } from '@/components/features/DynamicStateController';
import { Sample } from '@/components/layouts/Sample';

const DynamicStateControllerSample: React.FC = () => {
  return (
    <Sample>
      <DynamicStateController<string>
        defaultState=""
        render={({ state: [value, setValue] }) => (
          <>
            <p>DynamicStateController sample | {value}</p>
            <Form.Control
              type="text"
              placeholder="Enter text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
            />
          </>
        )}
      />
    </Sample>
  );
};

DynamicStateControllerSample.displayName = 'DynamicStateControllerSample';

export { DynamicStateControllerSample };
