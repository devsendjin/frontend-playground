import React from "react";

type InputCommonProps = React.InputHTMLAttributes<HTMLInputElement>;

type InputProps = InputCommonProps & {
  styleType?: "default" | "white";
  error?: boolean;
};

type InputWithLabelProps = InputCommonProps & {
  withLabel: boolean;
  labelText: string;
};

// type IOverload = {
//   (props: React.ForwardRefRenderFunction<HTMLInputElement, IInput>): any;
//   (
//     props: React.ForwardRefRenderFunction<HTMLInputElement, InputWithLabel>
//   ): any;
// };

type IOverload = {
  (props: React.ForwardRefRenderFunction<HTMLInputElement, InputProps>): any;
  (props: React.ForwardRefRenderFunction<HTMLInputElement, InputWithLabelProps>): any;
};

// type IOverload<T, P = {}> = typeof React.forwardRef;

// export const Input: IOverload = React.forwardRef<HTMLInputElement, IInput & React.InputHTMLAttributes<HTMLInputElement>>(
const ForwardRefSample: IOverload = React.forwardRef(
  ({ styleType = "default", error, className, withLabel = false, labelText = "", ...props }: any, ref) => {
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
