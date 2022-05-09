// @ts-nocheck
import React from 'react';

type Status = 'idle' | 'pending' | 'resolved' | 'rejected';;
type State<Data> = {
  status?: 'idle';
  data?: Data | null;
  error?: null | Error;
};
interface BaseAction<S extends Status> {
  type: S;
}
interface PendingAction  extends BaseAction<'pending'> {
  payload: {}
}
interface RejectedAction  extends BaseAction<'rejected'> {
  payload: {error: Error |null}
}
interface ResolvedAction<Data>  extends BaseAction<'resolved'> {
  payload: {data: Data |null}
}
type Action<Data> = ResolvedAction<Data> | RejectedAction | PendingAction;

const asyncReducer = (_state: State, action: Action)=> {
  const {type, payload} = action;
  switch (type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: payload.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: payload.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}

const initialState: State<string> = {
  status: 'idle',
  data: null,
  error: null,
}

const useAsync = <Data extends unknown>(initialState) => {
  const [state, unsafeDispatch] = React.useReducer<React.Reducer<State<Data>, Action<Data>>>(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  return {};
}

export {useAsync}
