import { Form } from '@/vendors/bootstrap';
import { DynamicStateController } from '@/components/features/DynamicStateController';

const DynamicStateControllerSample: RFC = () => {
  return (
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
  );
};

DynamicStateControllerSample.displayName = 'DynamicStateControllerSample';

export { DynamicStateControllerSample };
