import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Button, Form } from '@/vendors/bootstrap';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './TypedReduxSample.module.scss';

const TypedRedux: RFC = () => {
  const [input, setInput] = useState<string>('');
  const state = useTypedSelector((state) => state);
  console.group('TypedRedux');
  console.log('state: ', state);
  console.groupEnd();

  const { setFeatureState } = useActions();

  return (
    <div className={styles['typed-redux']}>
      <Button type="button" className="btn btn-light mt-0" onClick={() => setFeatureState(input)} variant="light">
        Set redux feature state to value from input below
      </Button>

      <Form.Control type="text" placeholder="Enter text" value={input} onChange={(e) => setInput(e.target.value)} />

      <pre style={{ overflow: 'scroll' }}>{JSON.stringify(state, null, 2)}</pre>
      <div>state.feature.featureName: {state.feature.featureName}</div>
    </div>
  );
};
TypedRedux.displayName = TypedRedux.name;

const TypedReduxSample: RFC = () => {
  return (
    <Provider store={store}>
      <TypedRedux />
    </Provider>
  );
};
TypedReduxSample.displayName = TypedReduxSample.name;

export { TypedReduxSample };
