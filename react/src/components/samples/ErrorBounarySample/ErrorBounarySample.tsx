import React, { useState } from 'react';
import { ErrorBoundary as ReactErrorBoundary, ErrorBoundaryPropsWithRender } from 'react-error-boundary';

// const ErrorFallback: ErrorBoundaryPropsWithRender['fallbackRender'] = ({ error, resetErrorBoundary }) => {
//   return (
//     <div role="alert">
//       <p>Something went wrong:</p>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try again</button>
//     </div>
//   );
// };

const ComponentThatMayError: React.FC = () => {
  throw new Error('💥 CABOOM 💥');
};

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
  resetState: () => void;
}

type TFallbackRender = (props: FallbackProps) => ReturnType<ErrorBoundaryPropsWithRender['fallbackRender']>;
const defaultFallbackRender: TFallbackRender = ({ error, resetErrorBoundary, resetState }) => {
  return (
    <div role="alert">
      <div>Oh no</div>
      <pre>{error.message}</pre>
      <button
        onClick={() => {
          resetState();
          resetErrorBoundary();
        }}
      >
        Try again
      </button>
    </div>
  );
};

// const ErrorBounary: React.FC = ({ children }) => {
//   return (
//     <ReactErrorBoundary
//       fallbackRender={(fallbackData) => defaultFallbackRender({ ...fallbackData, resetState })}
//       onError={() => {

//       }}
//     >
//       {children}
//     </ReactErrorBoundary>
//   );
// };

const ErrorBounarySample: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const resetState = () => {
    setToggle(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setToggle(true);
        }}
      >
        Show component with error
      </button>
      <ReactErrorBoundary
        fallbackRender={(fallbackData) => defaultFallbackRender({ ...fallbackData, resetState })}

        // fallbackRender or FallbackComponent

        // FallbackComponent={ErrorFallback}
        // onReset={() => {
        //   console.log('ErrorBoundary onReset');
        //   setToggle(false);
        // }}
        // resetKeys={[toggle]}
      >
        {!toggle && <div>component without error</div>}
        {toggle && <ComponentThatMayError />}
      </ReactErrorBoundary>
    </>
  );
};

export { ErrorBounarySample };
