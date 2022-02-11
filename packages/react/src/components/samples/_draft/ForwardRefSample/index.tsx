import React from 'react';

interface InputCommon extends React.InputHTMLAttributes<HTMLInputElement> {}

interface IInput extends InputCommon {
  styleType?: 'default' | 'white';
  error?: boolean;
}

interface InputWithLabel extends InputCommon {
  withLabel: boolean;
  labelText: string;
}

// type IOverload = {
//   (props: React.ForwardRefRenderFunction<HTMLInputElement, IInput>): any;
//   (
//     props: React.ForwardRefRenderFunction<HTMLInputElement, InputWithLabel>
//   ): any;
// };

type IOverload = {
  (props: React.ForwardRefRenderFunction<HTMLInputElement, IInput>): any;
  (props: React.ForwardRefRenderFunction<HTMLInputElement, InputWithLabel>): any;
};

// type IOverload<T, P = {}> = typeof React.forwardRef;

// export const Input: IOverload = React.forwardRef<HTMLInputElement, IInput & React.InputHTMLAttributes<HTMLInputElement>>(
const ForwardRefSample: IOverload = React.forwardRef(
  ({ styleType = 'default', error, className, withLabel = false, labelText = '', ...props }: any, ref) => {
    return withLabel ? (
      <label>
        <div>{labelText}</div>
        <input {...props} ref={ref} />
      </label>
    ) : (
      <input {...props} ref={ref} />
    );
  }
);

export { ForwardRefSample };
