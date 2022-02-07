import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './TypedReduxSample.module.scss';

const TypedRedux: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const state = useTypedSelector((state) => state);
  console.group('TypedRedux');
  console.log('state: ', state);
  console.groupEnd();

  const { setFeatureState } = useActions();

  return (
    <div className={styles['typed-redux']}>
      <button type="button" className="btn btn-primary mt-0" onClick={() => setFeatureState(input)}>
        Set redux feature state to value from input below
      </button>

      <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} />

      <pre style={{ overflow: 'scroll' }}>{JSON.stringify(state, null, 2)}</pre>
      <div>state.feature.featureName: {state.feature.featureName}</div>
    </div>
  );
};

const TypedReduxSample = () => {
  return (
    <Provider store={store}>
      <TypedRedux />
    </Provider>
  );
};

export { TypedReduxSample };
