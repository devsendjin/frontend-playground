type TUseFieldsParams<Fields> = {
  fields: Fields;
};

const useFields = <Fields extends unknown[] = {}[]>({ fields }: TUseFieldsParams<Fields>): any => {
  console.log(fields);
};

export { useFields };
