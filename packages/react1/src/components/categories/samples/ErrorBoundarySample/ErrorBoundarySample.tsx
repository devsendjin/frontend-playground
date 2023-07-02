import { useState } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryPropsWithRender,
  ErrorBoundaryPropsWithComponent,
} from "react-error-boundary";
import { Button } from "@/vendors/bootstrap";

const ErrorFallback: ErrorBoundaryPropsWithComponent["FallbackComponent"] = ({ error, resetErrorBoundary }) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary} variant='light'>
        Try again
      </Button>
    </div>
  );
};

const ComponentThatMayError: RFC = () => {
  throw new Error("💥 CABOOM 💥");
};
ComponentThatMayError.displayName = ComponentThatMayError.name;

type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
  resetState: () => void;
};

type TFallbackRender = (props: FallbackProps) => ReturnType<ErrorBoundaryPropsWithRender["fallbackRender"]>;
const defaultFallbackRender: TFallbackRender = ({ error, resetErrorBoundary, resetState }) => {
  return (
    <div role='alert'>
      <div>Oh no</div>
      <pre>{error.message}</pre>
      <Button
        onClick={() => {
          resetState();
          resetErrorBoundary();
        }}
        variant='light'>
        Try again
      </Button>
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
      <h3 className='h3'>With fallbackRender</h3>
      <Button
        type='button'
        onClick={() => {
          setToggle(true);
        }}
        variant='light'>
        Show component with error 1
      </Button>
      <ReactErrorBoundary fallbackRender={(fallbackData) => defaultFallbackRender({ ...fallbackData, resetState })}>
        {children}
        {!toggle && <div>component without error 1</div>}
        {toggle && <ComponentThatMayError />}
      </ReactErrorBoundary>
    </div>
  );
};
ErrorBoundaryFirst.displayName = ErrorBoundaryFirst.name;

type SomeText = "some text 1" | "some text 2" | "some text 3";
const ErrorBoundarySecond: RFC = () => {
  const [someText, setSomeText] = useState<SomeText>("some text 1");

  return (
    <div className='ms-4'>
      <h3 className='h3'>With FallbackComponent and resetKeys</h3>
      {(["some text 1", "some text 2", "some text 3"] as SomeText[]).map((text) => (
        <span
          style={{ display: "block", cursor: "pointer", outline: "1px solid #ddd", padding: "5px 0" }}
          key={text}
          onClick={() => {
            setSomeText(text);
          }}>
          set - {text}
        </span>
      ))}
      <br />
      <ReactErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[someText]}>
        {someText === "some text 2" && <ComponentThatMayError />}
        {someText !== "some text 2" && (
          <div>
            someText: <b>{someText}</b>
          </div>
        )}
      </ReactErrorBoundary>
    </div>
  );
};
ErrorBoundarySecond.displayName = ErrorBoundarySecond.name;

const ErrorBoundarySample: RFC = () => {
  return (
    <div className='d-flex flex-wrap'>
      <ErrorBoundaryFirst />
      <ErrorBoundarySecond />
    </div>
  );
};
ErrorBoundarySample.displayName = ErrorBoundarySample.name;

export { ErrorBoundarySample };
