import { useFields } from '@/hooks/useFields';

const fields = [{ name: 'qwe', defaultValue: 'asd' }];

const DynamicFieldsSample = () => {
  useFields<{ name: string; defaultValue: string | number }[]>({
    fields: fields,
  });
  return <div>DynamicFieldsSample sample</div>;
};

export { DynamicFieldsSample };
