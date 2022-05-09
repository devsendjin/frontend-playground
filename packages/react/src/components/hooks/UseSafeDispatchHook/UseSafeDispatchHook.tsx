import { Reducer, useEffect, useReducer } from 'react';
import cn from 'classnames';
import styles from './UseSafeDispatchHook.module.scss';

interface State {
  success: boolean;
  error: boolean;
  loading: boolean;
  text: string[];
}

interface Action {
  type: 'LOADING' | 'ERROR' | 'SUCCESS';
  payload: State;
}

const data: string[] = Array(10).fill('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, iure.');
const request = (ms: number = 1000) => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms);
  });
};

const initialState: State = {
  success: false,
  error: false,
  loading: false,
  text: [],
};

const listReducer = (state: State, action: Action): State => {
  // console.log('listReducer state', state);
  const { type, payload } = action;
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        ...payload,
      };
    case 'ERROR':
      return {
        ...state,
        ...payload,
      };
    case 'SUCCESS':
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const List: RFC = () => {
  // const [state, dispatch] = useReducer<Reducer<State, Action>>(listReducer, initialState);
  // useEffect(() => {
  //   dispatch({ type: 'LOADING', payload: { loading: true, error: false, success: false, text: [] } });
  //   request()
  //     .then((v) => {
  //       // console.log(v);
  //       dispatch({ type: 'SUCCESS', payload: { loading: false, error: false, success: true, text: v } });
  //     })
  //     .catch(() => {
  //       dispatch({ type: 'ERROR', payload: { loading: false, error: true, success: false, text: [] } });
  //     });
  // }, [state.loading, state.error, state.success]);
  //
  // if (state.loading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (state.error) {
  //   return <div>Error occurred</div>;
  // }
  //
  // if (state.success) {
  //   return (
  //     <div>
  //       {state.text.map((t) => (
  //         <p key={t}>{t}</p>
  //       ))}
  //     </div>
  //   );
  // }

  return <div>No data</div>;
};

interface UseSafeDispatchHookProps {
  className?: string;
}

const UseSafeDispatchHook: RFC<UseSafeDispatchHookProps> = ({ className }) => {
  return (
    <div className={cn(styles['use-safe-dispatch-hook'], className)}>
      <List />
    </div>
  );
};
UseSafeDispatchHook.displayName = UseSafeDispatchHook.name;

export { UseSafeDispatchHook };
