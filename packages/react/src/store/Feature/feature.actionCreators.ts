import { featureActionTypes } from './feature.actionTypes';

export const setFeatureState = (
  featureName: string
): { type: featureActionTypes.SET_FEATURE_TEST_STATE; payload: string } => {
  return {
    type: featureActionTypes.SET_FEATURE_TEST_STATE,
    payload: featureName,
  };
};
