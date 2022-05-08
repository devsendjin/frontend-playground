import { Action, FeatureState } from './feature.types';
import { featureActionTypes } from './feature.actionTypes';

const initialState: FeatureState = {
  featureName: 'Some feature',
};

export const featureReducer = (state: FeatureState = initialState, action: Action) => {
  switch (action.type) {
    case featureActionTypes.SET_FEATURE_TEST_STATE:
      return { ...state, featureName: action.payload };
    default:
      return state;
  }
};
