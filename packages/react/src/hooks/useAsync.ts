import React from 'react';

const useSafeDispatch = <TData>(dispatch: React.Dispatch<Action<TData>>) => {
  const isMounted = React.useRef(false);

  React.useLayoutEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return React.useCallback((params: Action<TData>) => (isMounted.current ? dispatch(params) : void 0), [dispatch]);
};

enum Status {
  'idle' = 'idle',
  'pending' = 'pending',
  'resolved' = 'resolved',
  'rejected' = 'rejected',
}

type State<TData, TError> = {
  status?: Status;
  data?: TData;
  error?: TError;
};
type BaseAction<S extends Status> = {
  type: S;
};
type PendingAction = BaseAction<Status.pending> & {
  type: Status.pending;
  payload?: {};
};
type RejectedAction = BaseAction<Status.rejected> & {
  type: Status.rejected;
  payload: { error: Error | undefined };
};
type ResolvedAction<TData> = BaseAction<Status.resolved> & {
  type: Status.resolved;
  payload: { data: TData | undefined };
};
type Action<TData> = ResolvedAction<TData> | RejectedAction | PendingAction;

const asyncReducer = <TData, TError>(state: State<TData, TError>, action: Action<TData>) => {
  const { type, payload } = action;
  switch (type) {
    case Status.pending: {
      return { status: Status.pending, data: undefined, error: undefined };
    }
    case Status.resolved: {
      return { status: Status.resolved, data: payload.data, error: undefined };
    }
    case Status.rejected: {
      return { status: Status.rejected, data: undefined, error: payload.error };
    }
    default: {
      return state;
    }
  }
};

type UseAsyncParams<TData, TError> = {
  initialState?: State<TData, TError> | (() => State<TData, TError>);
  requestFn: () => Promise<TData>;
};

const useAsync = <TData = unknown, TError = unknown>({ initialState, requestFn }: UseAsyncParams<TData, TError>) => {
  const [state, unsafeDispatch] = React.useReducer<React.Reducer<State<TData, TError>, Action<TData>>>(
    <React.Reducer<State<TData, TError>, Action<TData>>>asyncReducer,
    {
      status: Status.idle,
      data: undefined,
      error: undefined,
      ...(typeof initialState === 'function' ? initialState() : initialState),
    }
  );

  const { status, data, error } = state;

  const isLoading = status === Status.pending;
  const isSuccess = status === Status.resolved;
  const isError = status === Status.rejected;

  const dispatch = useSafeDispatch(unsafeDispatch);

  const request = React.useCallback(() => {
    if (status === Status.pending) return;

    dispatch({ type: Status.pending });

    requestFn()
      .then((response) => {
        dispatch({ type: Status.resolved, payload: { data: response } });
      })
      .catch((error) => {
        dispatch({ type: Status.rejected, payload: { error } });
      });
  }, [status, requestFn]);

  return {
    request,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
  };
};

export { useAsync };
