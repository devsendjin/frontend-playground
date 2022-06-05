import React from 'react';
import { Form } from '@/vendors/bootstrap';
import { useLocalStorageState } from '@/hooks/utils/useLocalStorageState';

const LocalStorageStateHook: RFC = () => {
  const [value, setValue] = useLocalStorageState<string>('LocalStorageStateHook_value', 'some default value');

  return (
    <div>
      <p>
        <b>LocalStorageStateHook value:</b> {value}
      </p>
      <Form.Control
        type="text"
        placeholder="Enter text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      />
    </div>
  );
};

LocalStorageStateHook.displayName = LocalStorageStateHook.name;

export { LocalStorageStateHook };
