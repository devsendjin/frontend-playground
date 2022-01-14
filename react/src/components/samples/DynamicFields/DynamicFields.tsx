import { useFields } from '@/hooks/useFields';

const fields = [{ name: 'qwe', defaultValue: 'asd' }];

const DynamicFields = () => {
  useFields<{ name: string; defaultValue: string | number }[]>({
    fields: fields,
  });
  return <div>DynamicFields sample</div>;
};

export { DynamicFields };
