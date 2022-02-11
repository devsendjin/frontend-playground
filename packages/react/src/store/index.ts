import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';

const middlewares: Middleware[] = [];

if (__DEV__) {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

middlewares.push(thunk);

const composeFunc: any = __DEV__ ? composeWithDevTools : compose;

export const store = createStore(rootReducer, composeFunc(applyMiddleware(...middlewares)));

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
