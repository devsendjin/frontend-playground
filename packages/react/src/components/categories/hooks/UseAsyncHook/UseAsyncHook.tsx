import cn from "classnames";
import { Button } from "@/vendors/bootstrap";
import { useAsync } from "@/hooks/useAsync";
import styles from "./UseAsyncHook.module.scss";

type UseAsyncHookProps = {
  className?: string;
};

const fakerRequest = (ms: number = 1000, throwError: boolean = false) => {
  return new Promise<RequestSuccessData>((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject({ code: 503, message: "503 service temporarily unavailable" });
      } else {
        resolve({
          question: "Is GOlang awesome?",
          answer: "Sure, dude!)",
        });
      }
    }, ms);
  });
};

type RequestSuccessData = {
  question: string;
  answer: string;
};

type RequestErrorData = {
  code: string;
  message: string;
};

const UseAsyncHook: RFC<UseAsyncHookProps> = ({ className }) => {
  const {
    request: requestFakeFnSuccess,
    data: dataFakeFnSuccess,
    error: errorFakeFnSuccess,
    isLoading: isLoadingFakeFnSuccess,
    isSuccess: isSuccessFakeFnSuccess,
    isError: isErrorFakeFnSuccess,
  } = useAsync<RequestSuccessData>({ requestFn: fakerRequest });

  const {
    request: requestFakeFnError,
    data: dataFakeFnError,
    error: errorFakeFnError,
    isLoading: isLoadingFakeFnError,
    isSuccess: isSuccessFakeFnError,
    isError: isErrorFakeFnError,
  } = useAsync<RequestSuccessData, RequestErrorData>({ requestFn: () => fakerRequest(1000, true) });

  return (
    <div className={cn(styles["use-async-hook"], className)}>
      <Button variant='light' onClick={requestFakeFnSuccess}>
        Perform success request
      </Button>
      <pre className='mt-3'>
        {JSON.stringify(
          {
            dataFakeFnSuccess,
            errorFakeFnSuccess,
            isLoadingFakeFnSuccess,
            isSuccessFakeFnSuccess,
            isErrorFakeFnSuccess,
          },
          null,
          2
        )}
      </pre>

      <Button className='mt-3' variant='light' onClick={requestFakeFnError}>
        Perform erorr request
      </Button>
      <pre className='mt-3'>
        {JSON.stringify(
          {
            dataFakeFnError,
            errorFakeFnError,
            isLoadingFakeFnError,
            isSuccessFakeFnError,
            isErrorFakeFnError,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export { UseAsyncHook };
