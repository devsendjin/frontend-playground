import { useState } from 'react';
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

const ComponentThatMayError: RFC = () => {
  throw new Error('💥 CABOOM 💥');
};
ComponentThatMayError.displayName = ComponentThatMayError.name;

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

const ErrorBoundaryFirst: RFC = ({ children }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const resetState = () => {
    setToggle(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setToggle(true);
        }}
      >
        Show component with error
      </button>
      <ReactErrorBoundary fallbackRender={(fallbackData) => defaultFallbackRender({ ...fallbackData, resetState })}>
        {children}
        {!toggle && <div>component without error</div>}
        {toggle && <ComponentThatMayError />}
      </ReactErrorBoundary>
    </div>
  );
};
ErrorBoundaryFirst.displayName = ErrorBoundaryFirst.name;

const ErrorBoundarySample: RFC = () => {
  return (
    <div>
      <ErrorBoundaryFirst />
    </div>
  );
};
ErrorBoundarySample.displayName = ErrorBoundarySample.name;

export { ErrorBoundarySample };
