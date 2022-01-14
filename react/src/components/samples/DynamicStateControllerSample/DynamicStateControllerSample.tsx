import { DynamicStateController } from '@/components/features/DynamicStateController';

const DynamicStateControllerSample = () => {
  return (
    <div>
      <DynamicStateController<string>
        defaultState=""
        render={({ state: [value, setValue] }) => (
          <>
            <div>Metric sample | {value}</div>
            <input value={value} onChange={(e) => setValue(e.currentTarget.value)} />
          </>
        )}
      />
    </div>
  );
};

export { DynamicStateControllerSample };
