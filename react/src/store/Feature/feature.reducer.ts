import { TAction, TFeatureState } from './feature.types';
import { featureActionTypes } from './feature.actionTypes';

const initialState: TFeatureState = {
  featureName: 'Some feature',
};

export const featureReducer = (state: TFeatureState = initialState, action: TAction) => {
  switch (action.type) {
    case featureActionTypes.SET_FEWATURE_TEST_STATE:
      return { ...state, featureName: action.payload };
    default:
      return state;
  }
};
