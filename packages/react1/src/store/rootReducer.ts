import { combineReducers } from 'redux';
import { featureReducer as feature } from './Feature/feature.reducer';

export const rootReducer = combineReducers({
  feature,
});
